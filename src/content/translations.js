export const translations = {
  en: {
    meta: {
      title: 'Alexandru Poenaru | Full-stack developer',
      description: 'Clean interfaces. Thoughtful systems. Full-stack developer in Tielt, taking the linking course to the MSc in Information Engineering Technology.',
      locale: 'en_GB', alternateLocale: 'nl_BE',
      image: 'https://www.alexandru-poenaru.com/social-preview-en.png', imageAlt: 'Alexandru Poenaru, full-stack developer in Tielt. Clean interfaces. Thoughtful systems.',
    },
    nav: { home: 'Home', projects: 'Work', about: 'About', resume: 'Experience', contact: 'Contact', label: 'Main navigation', dropdown: 'Navigate to section', top: 'Alexandru Poenaru, back to top', switch: 'Switch to Dutch', skip: 'Skip to content' },
    hero: {
      role: 'Full-stack developer', location: 'Tielt, Belgium', statement: ['Clean interfaces.', 'Thoughtful systems.'],
      description: 'I build across the stack, with a soft spot for the logic, structure, and architecture underneath.',
      explore: 'Explore my work', currently: 'Currently', course: 'Taking the linking course to the', degree: 'Master of Science in Information Engineering Technology.', about: 'A little about me',
    },
    sketch: {
      aria: 'Explore my interests across the stack', heading: 'Across the stack', instruction: 'Click to explore', figure: 'FIG. 01 / HOW I THINK', caption: 'INTERFACE → LOGIC → STORAGE',
      layers: [
        { name: 'Interface', label: '01 / The part you see', title: 'Details that feel right.', description: 'I enjoy making interfaces clear, useful, and satisfying to use. React, TypeScript, and care for the small things.' },
        { name: 'Backend', label: '02 / Where I feel at home', title: 'The logic underneath.', description: 'APIs, architecture, and the way data moves through a system. This is the part of the stack I love spending time in.' },
        { name: 'Data', label: '03 / A solid foundation', title: 'Structure before scale.', description: 'From relational databases to analytics with DuckDB, I like giving information a structure that makes it useful.' },
      ],
    },
    work: {
      eyebrow: '01 / Selected work', title: 'A few things I’ve built', aside: '04 PROJECTS / SELECT TO EXPLORE', select: 'Select a project', technologies: 'Technologies', unavailable: 'Not available', repository: 'GitHub repository not available', inProgress: 'Work in progress',
      projects: [
        { name: 'KotTask', category: 'Web application', alt: 'KotTask task details and shared weekly calendar', description: 'A shared task list with an integrated calendar. Assign tasks to yourself or others and keep the week in view.' },
        { name: 'Production dashboard', category: 'Web application', alt: 'Production KPI dashboard with machine maintenance overview', description: 'A dashboard for production KPIs and machine maintenance, bringing the overview and the operational details into one place.' },
        { name: 'Kingdomino', category: 'Board game', alt: 'Kingdomino board game', description: 'The board game Kingdomino, made playable for two to four players. A project in game rules, state, and Java.' },
        { name: 'Helpdesk', category: 'Internal tool', alt: 'Helpdesk ticket management application', description: 'A ticket system built for the helpdesk at my internship company in 2023. A practical tool for keeping track of support requests.' },
      ],
    },
    about: {
      eyebrow: '02 / The person behind the code', title: 'Hi, I’m Alex', aside: '22 YEARS OLD / ALWAYS CURIOUS', portrait: 'Portrait of Alexandru Poenaru', caption: 'ALEXANDRU POENARU / BELGIUM',
      lead: ['It started with robotics at ten.', 'Then I found the software.'],
      paragraphs: [
        'Soldering components and watching something work taught me patience and precision. A few years later, programming gave me another way to build things, with logic instead of a soldering iron.',
        'Today, I enjoy the full stack. Getting an interface just right is satisfying; figuring out the structure, data flow, and architecture behind it is where I feel most at home.',
        'I’m 22, based in Tielt, Belgium, and currently taking the linking course to the Master of Science in Information Engineering Technology, following my Applied IT studies at HOGENT.',
      ],
    },
    resume: {
      eyebrow: '03 / Learning by doing', title: 'The path so far', cv: 'CV in Dutch', experience: 'Experience', practice: 'In practice', education: 'Education', learning: 'Still learning', toolkit: 'Toolkit', toolsLabel: 'Things I work with', categories: 'Technology categories',
      skills: { languages: 'Languages', frameworks: 'Frameworks', databases: 'Databases', tools: 'Tools' },
      proficiency: 'Self-assessed level', outOf: 'out of 5', skillHint: 'Select a skill to explore my level.',
      current: 'Current', course: 'Linking course', degree: 'To the Master of Science in Information Engineering Technology', progress: 'In progress', bachelor: 'Bachelor of Applied Information Technology', specialization: 'HOGENT · Full Stack Development', secondary: 'Secondary school · IT Management',
      jobs: [
        { date: 'MAR - MAY 2026', title: 'Backend & AI internship', place: 'Turtle Srl · Italy', description: 'Built an NLP and OCR privacy engine to detect and redact personal information, plus the backend and database for a chat-to-chart analytics platform. Integrated both into an enterprise platform, working with concurrency, thread pools, and webhooks.' },
        { date: 'SEP - DEC 2025', title: 'Student developer', place: 'ECOMPASS · Zottegem', description: 'Implemented new features with React Native, HTML, CSS, and JavaScript.' },
        { date: 'JUL 2024 & 2025', title: 'Student worker', place: 'INJEXTRU · Tielt', description: 'Production and packaging across multiple machines, handling large plastic parts including swimming pool shutters.' },
        { date: 'AUG 2024 & 2025', title: 'Student worker', place: 'SOVAPLASTICS · Tielt', description: 'Production and packaging of smaller plastic parts, including caps and baskets.' },
        { date: 'JUL - AUG 2023', title: 'IT helpdesk internship', place: 'Sint-Andriesziekenhuis · Tielt', description: 'Helped doctors resolve computer issues and installed computers in the workplace.' },
        { date: '2019 - 2025', title: 'Student worker · weekends', place: 'Ranson-Cannière bakery · Tielt', description: 'Prepared and packaged fruit cakes, bread, and pastries for orders.' },
      ],
    },
    contact: {
      eyebrow: '04 / Start a conversation', title: ['Have something', 'in mind'], introduction: ['A project, a question, or just a hello.', 'I’d love to hear from you.'],
      copy: 'COPY EMAIL +', copied: 'COPIED ✓', copyError: 'Copy unavailable. Select the email address to copy it.', phone: 'Phone', form: 'Send a message',
      name: 'Your name', email: 'Email address', subject: 'What’s it about?', message: 'Your message', namePlaceholder: 'Alex, for example', emailPlaceholder: 'you@example.com', subjectPlaceholder: 'A project, an idea…', messagePlaceholder: 'Tell me a little about it.',
      inbox: 'Straight to my inbox', send: 'Send message', sending: 'Sending…',
      status: { success: 'Message sent. Thanks for reaching out!', error: 'Couldn’t send your message. Your draft is still here. Try again or email me directly.', invalid: 'Please fill in every field with more than spaces.' },
      required: 'Please fill in this field.', invalidEmail: 'Please enter a valid email address.',
    },
    footer: { note: 'Full-stack development · Tielt, Belgium', top: 'Back to top' },
  },
  nl: {
    meta: {
      title: 'Alexandru Poenaru | Full-stack Developer',
      description: 'Heldere interfaces. Doordachte systemen. Full-stack Developer uit Tielt en student in het schakelprogramma naar master informatica. Ontdek mijn werk.',
      locale: 'nl_BE', alternateLocale: 'en_GB',
      image: 'https://www.alexandru-poenaru.com/social-preview-nl.png', imageAlt: 'Alexandru Poenaru, Full-stack Developer uit Tielt. Heldere interfaces. Doordachte systemen.',
    },
    nav: { home: 'Start', projects: 'Projecten', about: 'Over mij', resume: 'Ervaring', contact: 'Contact', label: 'Hoofdnavigatie', dropdown: 'Ga naar onderdeel', top: 'Alexandru Poenaru, terug naar boven', switch: 'Schakel over naar Engels', skip: 'Ga naar de inhoud' },
    hero: {
      role: 'Full-stack Developer', location: 'Tielt, België', statement: ['Heldere interfaces.', 'Doordachte systemen.'],
      description: 'Ik werk aan de volledige stack, met een zwak voor de logica, structuur en architectuur achter de schermen.',
      explore: 'Bekijk mijn projecten', currently: 'Momenteel', course: 'Ik volg het schakelprogramma tot de', degree: 'Master in de industriële wetenschappen: informatica.', about: 'Leer me kennen',
    },
    sketch: {
      aria: 'Ontdek mijn interesses binnen de volledige stack', heading: 'De volledige stack', instruction: 'Klik en ontdek', figure: 'FIG. 01 / ZO DENK IK', caption: 'INTERFACE → LOGICA → OPSLAG',
      layers: [
        { name: 'Interface', label: '01 / Wat je ziet', title: 'Details die kloppen.', description: 'Ik maak interfaces graag helder, bruikbaar en prettig in gebruik. Met React, TypeScript en aandacht voor de kleine dingen.' },
        { name: 'Backend', label: '02 / Waar ik thuis ben', title: 'De logica erachter.', description: 'API’s, architectuur en hoe data door een systeem stroomt. Dit is het deel van de stack waar ik het liefst aan werk.' },
        { name: 'Data', label: '03 / Een stevige basis', title: 'Eerst structuur, dan schaal.', description: 'Van relationele databanken tot analyses met DuckDB: ik geef informatie graag een structuur die ze bruikbaar maakt.' },
      ],
    },
    work: {
      eyebrow: '01 / Een selectie van mijn werk', title: 'Een paar van mijn projecten', aside: '04 PROJECTEN / KLIK EN ONTDEK', select: 'Kies een project', technologies: 'Technologieën', unavailable: 'Niet beschikbaar', repository: 'GitHub-repository niet beschikbaar', inProgress: 'In ontwikkeling',
      projects: [
        { name: 'KotTask', category: 'Webapplicatie', alt: 'Taakdetails en gedeelde weekkalender in KotTask', description: 'Een gedeelde takenlijst met een geïntegreerde kalender. Wijs taken toe aan jezelf of anderen en houd overzicht over de week.' },
        { name: 'Productiedashboard', category: 'Webapplicatie', alt: 'Dashboard met productie-KPI’s en een overzicht van machineonderhoud', description: 'Een dashboard voor productie-KPI’s en machineonderhoud, met het overzicht en de operationele details op één plek.' },
        { name: 'Kingdomino', category: 'Bordspel', alt: 'Het bordspel Kingdomino', description: 'Het bordspel Kingdomino, speelbaar gemaakt voor twee tot vier spelers. Een project rond spelregels, speltoestand en Java.' },
        { name: 'Helpdesk', category: 'Interne toepassing', alt: 'Toepassing voor het beheer van helpdesktickets', description: 'Een ticketsysteem dat ik in 2023 bouwde voor de helpdesk van mijn stagebedrijf. Een praktisch hulpmiddel om ondersteuningsvragen op te volgen.' },
      ],
    },
    about: {
      eyebrow: '02 / De persoon achter de code', title: 'Hoi, ik ben Alex', aside: '22 JAAR / ALTIJD NIEUWSGIERIG', portrait: 'Portret van Alexandru Poenaru', caption: 'ALEXANDRU POENARU / BELGIË',
      lead: ['Het begon met robotica op mijn tiende.', 'Daarna ontdekte ik software.'],
      paragraphs: [
        'Componenten solderen en zien dat iets werkt, leerde me geduld en nauwkeurigheid. Een paar jaar later gaf programmeren me een andere manier om dingen te bouwen, met logica in plaats van een soldeerbout.',
        'Vandaag werk ik graag aan de volledige stack. Een interface precies goed krijgen geeft voldoening. Maar de structuur, datastroom en architectuur erachter uitwerken is waar ik me het meest thuis voel.',
        'Ik ben 22, woon in Tielt en volg momenteel het schakelprogramma tot Master in de industriële wetenschappen: informatica, na mijn opleiding Toegepaste Informatica aan HOGENT.',
      ],
    },
    resume: {
      eyebrow: '03 / Leren door te doen', title: 'Mijn parcours tot nu toe', cv: 'CV in het Nederlands', experience: 'Ervaring', practice: 'In de praktijk', education: 'Opleiding', learning: 'Ik blijf leren', toolkit: 'Gereedschapskist', toolsLabel: 'Waarmee ik werk', categories: 'Technologiecategorieën',
      skills: { languages: 'Programmeertalen', frameworks: 'Frameworks', databases: 'Databanken', tools: 'Hulpmiddelen' },
      proficiency: 'Eigen inschatting', outOf: 'van 5', skillHint: 'Selecteer een vaardigheid om mijn niveau te bekijken.',
      current: 'Momenteel', course: 'Schakelprogramma', degree: 'Tot Master in de industriële wetenschappen: informatica', progress: 'In uitvoering', bachelor: 'Bachelor Toegepaste Informatica', specialization: 'HOGENT · Fullstackontwikkeling', secondary: 'Secundair onderwijs · Informaticabeheer',
      jobs: [
        { date: 'MRT - MEI 2026', title: 'Stage backend & AI', place: 'Turtle Srl · Italië', description: 'Ik bouwde een privacytoepassing met NLP en OCR om persoonsgegevens te herkennen en te anonimiseren, en de backend en databank van een analyseplatform dat grafieken genereert via chat. Ik integreerde beide in een bedrijfsplatform, met aandacht voor gelijktijdige verwerking, threadpools en webhooks.' },
        { date: 'SEP - DEC 2025', title: 'Jobstudent ontwikkelaar', place: 'ECOMPASS · Zottegem', description: 'Ik implementeerde nieuwe functionaliteiten met React Native, HTML, CSS en JavaScript.' },
        { date: 'JUL 2024 & 2025', title: 'Jobstudent', place: 'INJEXTRU · Tielt', description: 'Productie en verpakking aan meerdere machines, met grote kunststofonderdelen zoals zwembadrolluiken.' },
        { date: 'AUG 2024 & 2025', title: 'Jobstudent', place: 'SOVAPLASTICS · Tielt', description: 'Productie en verpakking van kleinere kunststofonderdelen, waaronder doppen en mandjes.' },
        { date: 'JUL - AUG 2023', title: 'Stage IT-helpdesk', place: 'Sint-Andriesziekenhuis · Tielt', description: 'Ik hielp artsen bij computerproblemen en installeerde computers op de werkvloer.' },
        { date: '2019 - 2025', title: 'Jobstudent · weekends', place: 'Bakkerij Ranson-Cannière · Tielt', description: 'Ik zette fruittaarten, brood en gebak klaar en verpakte ze voor bestellingen.' },
      ],
    },
    contact: {
      eyebrow: '04 / Begin een gesprek', title: ['Iets in', 'gedachten'], introduction: ['Een project, een vraag of gewoon een hallo.', 'Ik hoor graag van je.'],
      copy: 'KOPIEER E-MAIL +', copied: 'GEKOPIEERD ✓', copyError: 'Kopiëren is niet beschikbaar. Selecteer het e-mailadres om het te kopiëren.', phone: 'Telefoon', form: 'Stuur een bericht',
      name: 'Je naam', email: 'E-mailadres', subject: 'Waarover gaat het?', message: 'Je bericht', namePlaceholder: 'Bijvoorbeeld Alex', emailPlaceholder: 'jij@voorbeeld.be', subjectPlaceholder: 'Een project, een idee…', messagePlaceholder: 'Vertel me er wat over.',
      inbox: 'Rechtstreeks naar mijn inbox', send: 'Verstuur bericht', sending: 'Versturen…',
      status: { success: 'Bericht verstuurd. Bedankt om contact op te nemen!', error: 'Je bericht kon niet worden verstuurd. Je tekst staat er nog. Probeer opnieuw of mail me rechtstreeks.', invalid: 'Vul elk veld in met meer dan alleen spaties.' },
      required: 'Vul dit veld in.', invalidEmail: 'Vul een geldig e-mailadres in.',
    },
    footer: { note: 'Fullstackontwikkeling · Tielt, België', top: 'Terug naar boven' },
  },
};
