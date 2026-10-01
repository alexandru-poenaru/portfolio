import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import emailjs from 'emailjs-com';
import App from './App.jsx';
import { translations } from './content/translations';
import { LANGUAGE_KEY } from './content/LanguageContext';
import { skills } from './content/skills';

jest.mock('emailjs-com', () => ({ send: jest.fn() }));

beforeEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
  localStorage.setItem(LANGUAGE_KEY, 'en');
  global.IntersectionObserver = jest.fn(() => ({ observe: jest.fn(), disconnect: jest.fn() }));
  window.history.replaceState(null, '', '/');
  Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: jest.fn().mockResolvedValue(undefined) } });
});

test('shows the current age and linking course, without the old incoming status', () => {
  render(<App />);
  expect(screen.getByText(/22 YEARS OLD/)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Linking course' })).toBeInTheDocument();
  expect(screen.getByText(/To the Master of Science in Information Engineering Technology/)).toBeInTheDocument();
  expect(screen.queryByText(/Incoming Master|21 year|currently finishing/i)).not.toBeInTheDocument();
});

test('the system sketch switches descriptions and the selected layer', () => {
  render(<App />);
  const data = screen.getByRole('button', { name: 'Data' });
  fireEvent.click(data);
  expect(data).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getByRole('button', { name: 'Backend' })).toHaveAttribute('aria-pressed', 'false');
  expect(screen.getByRole('heading', { name: 'Structure before scale.' })).toBeInTheDocument();
});

test('every project shows a GitHub unavailable label and no repository links', () => {
  render(<App />);
  const work = screen.getByRole('region', { name: /A few things/ });
  for (const name of ['KotTask', 'Production dashboard', 'Kingdomino', 'Helpdesk']) {
    const button = within(work).getByRole('button', { name: new RegExp(name) });
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(within(work).getByRole('article', { name })).toBeInTheDocument();
    expect(within(work).getByLabelText('GitHub repository not available')).toHaveTextContent('Not available');
    expect(within(work).queryByRole('link')).not.toBeInTheDocument();
  }
});

test('the toolkit filters technologies by category', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('tab', { name: 'Databases' }));
  const list = screen.getByRole('list', { name: 'Databases' });
  expect(within(list).getByText('PostgreSQL')).toBeInTheDocument();
  expect(within(list).queryByText('JavaScript')).not.toBeInTheDocument();
});

test('the mobile menu follows the language switch, navigates, and closes with Escape', () => {
  render(<App />);
  const button = screen.getByRole('button', { name: 'Navigate to section' });
  expect(screen.getByRole('button', { name: 'Switch to Dutch' }).nextElementSibling).toBe(button);
  expect(button).toHaveAttribute('aria-expanded', 'false');
  fireEvent.click(button);
  const dropdown = document.getElementById('mobile-navigation');
  expect(dropdown).not.toHaveAttribute('hidden');
  fireEvent.click(within(dropdown).getByRole('link', { name: 'Work' }));
  expect(dropdown).toHaveAttribute('hidden');
  // Native anchor navigation is covered in the browser.
  expect(button).toHaveAttribute('aria-expanded', 'false');
  fireEvent.click(button);
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(dropdown).toHaveAttribute('hidden');
  expect(button).toHaveFocus();
  fireEvent.click(button);
  fireEvent.pointerDown(document.body);
  expect(dropdown).toHaveAttribute('hidden');
});

test('skill tabs support arrows, Home and End with one tab stop and a labelled panel', () => {
  render(<App />);
  const tabs = within(screen.getByRole('tablist', { name: 'Technology categories' })).getAllByRole('tab');
  tabs[0].focus();
  fireEvent.keyDown(tabs[0], { key: 'ArrowRight' });
  expect(tabs[1]).toHaveFocus();
  expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
  expect(tabs.filter(tab => tab.tabIndex === 0)).toEqual([tabs[1]]);
  expect(screen.getByRole('tabpanel', { name: 'Frameworks' })).toBeInTheDocument();
  fireEvent.keyDown(tabs[1], { key: 'End' });
  expect(tabs[3]).toHaveFocus();
  fireEvent.keyDown(tabs[3], { key: 'ArrowRight' });
  expect(tabs[0]).toHaveFocus();
  fireEvent.keyDown(tabs[0], { key: 'ArrowLeft' });
  expect(tabs[3]).toHaveFocus();
  fireEvent.keyDown(tabs[3], { key: 'Home' });
  expect(tabs[0]).toHaveFocus();
  expect(screen.getAllByRole('tabpanel')).toHaveLength(1);
});

test('skill levels appear on hover, keyboard focus and tap, and survive language changes', () => {
  render(<App />);
  const panel = screen.getByRole('tabpanel', { name: 'Languages' });
  fireEvent.mouseEnter(within(panel).getByRole('button', { name: 'Python' }));
  expect(within(panel).getByText('Python', { selector: 'strong' })).toBeInTheDocument();
  expect(within(panel).getByRole('button', { name: 'Python' })).toHaveAccessibleDescription('Self-assessed level: 4 out of 5');
  fireEvent.focus(within(panel).getByRole('button', { name: 'C#' }));
  expect(within(panel).getByText('C#', { selector: 'strong' })).toBeInTheDocument();
  expect(within(panel).getByRole('button', { name: 'C#' })).toHaveAccessibleDescription('Self-assessed level: 3 out of 5');
  fireEvent.click(screen.getByRole('tab', { name: 'Tools' }));
  fireEvent.click(screen.getByRole('button', { name: 'Git' }));
  expect(screen.getByRole('button', { name: 'Git' })).toHaveAttribute('aria-pressed', 'true');
  fireEvent.click(screen.getByRole('button', { name: 'Switch to Dutch' }));
  expect(screen.getByRole('button', { name: 'Git' })).toHaveAccessibleDescription('Eigen inschatting: 5 van 5');
  expect(screen.getByRole('tabpanel', { name: 'Hulpmiddelen' })).toHaveTextContent('Git');
});

test('all 26 skill scores match the original portfolio', () => {
  expect(Object.fromEntries(Object.values(skills).flat().map(({ name, level }) => [name, level]))).toEqual({
    JavaScript: 4, TypeScript: 4, Python: 4, Java: 4, 'C#': 3, HTML: 4, CSS: 3,
    'Node.js': 4, 'Spring Boot': 2, React: 3, JSX: 3, 'Tailwind CSS': 4, '.NET Framework': 3,
    'Entity Framework': 3, FastAPI: 4, 'React Native': 2, 'Llama-cpp': 2,
    MySQL: 4, 'MS SQL Server': 3, MongoDB: 2, DuckDB: 2, SQLite: 2, PostgreSQL: 3,
    Git: 5, Docker: 3, Yarn: 3,
  });
});

test('Dutch SEO metadata, canonical URL and profile are available before JavaScript runs', () => {
  const html = require('fs').readFileSync('public/index.html', 'utf8');
  const doc = new DOMParser().parseFromString(html, 'text/html');
  expect(doc.title).toBe(translations.nl.meta.title);
  expect(doc.querySelector('meta[name="description"]').content).toBe(translations.nl.meta.description);
  expect(doc.querySelector('meta[property="og:description"]').content).toBe(translations.nl.meta.description);
  expect(doc.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
  expect(doc.querySelector('link[rel="canonical"]').getAttribute('href')).toBe('https://www.alexandru-poenaru.com/');
  const graph = JSON.parse(doc.querySelector('script[type="application/ld+json"]').textContent)['@graph'];
  expect(graph.find(node => node['@type'] === 'Person')).toMatchObject({ name: 'Alexandru Poenaru', description: expect.stringContaining('schakelprogramma') });
  expect(doc.querySelector('link[rel="icon"][type="image/png"]')).not.toBeNull();
});

test('all translation keys are present in Dutch and neither language uses em dashes', () => {
  const compare = (english, dutch) => {
    expect(typeof dutch).toBe(typeof english);
    if (typeof english === 'string') {
      expect(dutch.length).toBeGreaterThan(0);
      expect(english + dutch).not.toMatch(/\u2014/);
    } else {
      expect(Object.keys(dutch)).toEqual(Object.keys(english));
      Object.keys(english).forEach(key => compare(english[key], dutch[key]));
    }
  };
  compare(translations.en, translations.nl);
});

test('switching languages translates all sections, metadata and accessibility labels while preserving state', () => {
  const description = document.createElement('meta');
  description.name = 'description';
  document.head.appendChild(description);
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: /Production dashboard/ }));
  fireEvent.click(screen.getByRole('tab', { name: 'Databases' }));
  fireEvent.change(screen.getByLabelText('Your message'), { target: { value: 'My draft stays here' } });
  fireEvent.click(screen.getByRole('button', { name: 'Switch to Dutch' }));
  expect(document.documentElement.lang).toBe('nl');
  expect(document.title).toBe(translations.nl.meta.title);
  expect(description.content).toBe(translations.nl.meta.description);
  expect(screen.getByRole('heading', { name: /Een paar van mijn projecten/ })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Hoi, ik ben Alex/ })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Mijn parcours tot nu toe/ })).toBeInTheDocument();
  expect(screen.getByRole('article', { name: 'Productiedashboard' })).toBeInTheDocument();
  expect(screen.getByRole('list', { name: 'Databanken' })).toBeInTheDocument();
  expect(screen.getByLabelText('Je bericht')).toHaveValue('My draft stays here');
  expect(screen.getByLabelText('Ga naar onderdeel')).toBeInTheDocument();
  expect(screen.getByText('Niet beschikbaar')).toBeInTheDocument();
  expect(localStorage.getItem(LANGUAGE_KEY)).toBe('nl');
  fireEvent.click(screen.getByRole('button', { name: 'Schakel over naar Engels' }));
  expect(document.documentElement.lang).toBe('en');
  expect(screen.getByLabelText('Your message')).toHaveValue('My draft stays here');
  description.remove();
});

test('Dutch is the default when no language preference is saved', () => {
  localStorage.clear();
  render(<App />);
  expect(document.documentElement.lang).toBe('nl');
  expect(screen.getByRole('heading', { name: 'Schakelprogramma' })).toBeInTheDocument();
});

test('a saved English preference is restored on startup', () => {
  render(<App />);
  expect(document.documentElement.lang).toBe('en');
  expect(screen.getByRole('heading', { name: 'Linking course' })).toBeInTheDocument();
});

function fillMessage() {
  fireEvent.change(screen.getByLabelText('Your name'), { target: { value: ' Test Visitor ' } });
  fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByLabelText('What’s it about?'), { target: { value: ' A project ' } });
  fireEvent.change(screen.getByLabelText('Your message'), { target: { value: ' Hello Alex ' } });
}

test('contact sends trimmed values once, prevents duplicate submissions, and clears on success', async () => {
  let resolve;
  emailjs.send.mockReturnValue(new Promise(done => { resolve = done; }));
  render(<App />);
  fillMessage();
  const form = screen.getByRole('form', { name: 'Send a message' });
  fireEvent.submit(form);
  fireEvent.submit(form);
  await waitFor(() => expect(emailjs.send).toHaveBeenCalledTimes(1));
  expect(emailjs.send).toHaveBeenCalledWith(expect.any(String), expect.any(String), {
    from_name: 'Test Visitor', from_email: 'test@example.com', subject: 'A project', message: 'Hello Alex',
  }, expect.any(String));
  expect(screen.getByRole('button', { name: /Sending/ })).toBeDisabled();
  await act(async () => resolve({ status: 200 }));
  expect(screen.getByText('Message sent. Thanks for reaching out!')).toBeInTheDocument();
  expect(screen.getByLabelText('Your message')).toHaveValue('');
});

test('contact keeps the draft after failure and can retry', async () => {
  emailjs.send.mockRejectedValueOnce(new Error('offline')).mockResolvedValueOnce({ status: 200 });
  render(<App />);
  fillMessage();
  fireEvent.submit(screen.getByRole('form', { name: 'Send a message' }));
  await screen.findByText(/Couldn’t send your message/);
  expect(screen.getByLabelText('Your message')).toHaveValue(' Hello Alex ');
  fireEvent.submit(screen.getByRole('form', { name: 'Send a message' }));
  await screen.findByText('Message sent. Thanks for reaching out!');
  expect(emailjs.send).toHaveBeenCalledTimes(2);
});

test('contact rejects whitespace-only drafts without sending', () => {
  render(<App />);
  fillMessage();
  fireEvent.change(screen.getByLabelText('Your message'), { target: { value: '   ' } });
  fireEvent.submit(screen.getByRole('form', { name: 'Send a message' }));
  expect(screen.getByText(/more than spaces/)).toBeInTheDocument();
  expect(emailjs.send).not.toHaveBeenCalled();
});

test('copy email confirms in the button without an extra message and handles clipboard failure', async () => {
  navigator.clipboard.writeText.mockRejectedValueOnce(new Error('denied'));
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: 'COPY EMAIL +' }));
  await screen.findByText(/Copy unavailable/);
  fireEvent.click(screen.getByRole('button', { name: 'COPY EMAIL +' }));
  await waitFor(() => expect(screen.getByRole('button', { name: 'COPIED ✓' })).toBeInTheDocument());
  expect(screen.queryByText('Email address copied.')).not.toBeInTheDocument();
  expect(screen.queryByText('E-mailadres gekopieerd.')).not.toBeInTheDocument();
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  expect(screen.getAllByRole('status').find(status => status.textContent === 'COPIED ✓')).toHaveClass('sr-only');
  expect(navigator.clipboard.writeText).toHaveBeenLastCalledWith('alexandru.george.poenaru@gmail.com');
});
