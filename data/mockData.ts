

import { Agency, Program, Feedback, CitySafetyData, Course, SafetyStatus } from '../types';

// --- CONSTANTS ---
export const CERTIFICATIONS = [
  "Suporte 24/7",
  "Female-Only",
  "Women's Health",
];

export const VERIFICATIONS = [
];

// --- GENERATION HELPERS ---
const agenciesData = [
  { name: "Global Sisters Exchange", logo: "/logos/Global Sisters Exchange.png" },
  { name: "Wanderlust Women Abroad", logo: "/logos/Wanderlust Women Abroad.png" },
  { name: "Athena Adventures", logo: "/logos/Athena Adventures.png" },
  { name: "Femme Forward Travels", logo: "/logos/Femme Forward Travels.png" },
  { name: "Empower Exchange", logo: "/logos/Empower Exchange.png" },
  
  { name: "Sisterhood Journeys", logo: "/logos/Sisterhood Journeys.png" },
  { name: "Galavant Girls", logo: "/logos/Galavant Girls.png" },
  { name: "ConnectHer Abroad", logo: "/logos/ConnectHer Abroad.png" },
  { name: "The Abroad Arc", logo: "/logos/The Abroad Arc.png" },
  { name: "Venture Vixens", logo: "/logos/Venture Vixens.png" },
  
  { name: "StudySphere Internacional", logo: "/logos/StudySphere Internacional.png" },
  { name: "Global Horizons", logo: "/logos/Global Horizons.png" },
  { name: "Academic Adventures", logo: "/logos/Academic Adventures.png" },
  { name: "World Class Studies", logo: "/logos/World Class Studies.png" },
  { name: "InterConnect", logo: "/logos/InterConnect.png" },
  
  { name: "Future Frontiers", logo: "/logos/Future Frontiers.png" },
  { name: "Odyssey Exchange", logo: "/logos/Odyssey Exchange.png" },
  { name: "Pioneer Programs", logo: "/logos/Pioneer Programs.png" },
  { name: "Summit Studies", logo: "/logos/Summit Studies.png" },
  { name: "Nexus International", logo: "/logos/Nexus International.png" },
];

const firstNames = ["Maria", "Ana", "Sofia", "Lara", "Beatriz", "Mariana", "Júlia", "Isabella", "Laura", "Camila", "Gabriela", "Priya", "Chloe", "Aisha", "Elena", "Fernanda", "Luiza", "Valentina", "Yasmin", "Bruna"];
const lastNames = ["Silva", "Santos", "Oliveira", "Souza", "Rodrigues", "Ferreira", "Alves", "Pereira", "Lima", "Gomes", "Costa", "Ribeiro", "Martins", "Carvalho", "Almeida"];

const positiveComments = [
  "Experiência transformadora! Me senti segura e acolhida do início ao fim. A agência superou todas as minhas expectativas.",
  "Recomendo de olhos fechados! O suporte local foi incrível e as amizades que fiz levarei para a vida.",
  "O programa foi perfeitamente organizado. A acomodação era ótima e as aulas muito enriquecedoras. Uma jornada inesquecível.",
  "A melhor decisão que já tomei! A equipe foi super atenciosa e me ajudou com cada detalhe. Me senti muito empoderada.",
  "Simplesmente perfeito. O treinamento pré-partida me deixou muito confiante para viajar sozinha."
];
const neutralComments = [
  "Foi uma boa experiência no geral. O programa acadêmico era forte, mas a organização de eventos sociais poderia ser melhor.",
  "A cidade é incrível e aprendi muito. Tive alguns problemas com a acomodação no início, mas a agência resolveu.",
  "O curso correspondeu às expectativas. A comunicação com a agência era um pouco lenta às vezes, mas nada que atrapalhasse muito.",
  "Gostei do programa, mas achei que a descrição online era um pouco mais glamourosa que a realidade. Mesmo assim, valeu a pena.",
  "Uma experiência sólida. Não foi extraordinária, mas cumpriu o que prometia. A localização do alojamento não era a ideal."
];
const negativeComments = [
  "Decepcionante. O suporte prometido não existiu quando precisei. Tive que resolver um problema de visto sozinha.",
  "Não recomendo. As fotos do site não condizem com a realidade da acomodação, que era precária e longe de tudo.",
  "Muito desorganizado. Informações importantes foram passadas em cima da hora, causando muito estresse.",
  "Custo-benefício ruim. O valor é muito alto para o que é oferecido. Faltou transparência nos custos extras.",
  "Me senti abandonada. A agência era ótima para vender o pacote, mas durante o intercâmbio, o contato era quase impossível."
];

const programTypes = ["Imersão em", "Estudos de", "Voluntariado em", "Estágio em", "Workshop de", "Aventura e"];
const programSubjects = ["Língua e Cultura", "Negócios Europeus", "Artes Digitais e Design", "Escrita Criativa", "Biologia Marinha", "Marketing de Moda", "Sustentabilidade", "Relações Internacionais", "Saúde Global", "Gastronomia", "Fotografia", "Direitos Humanos"];
const cities = [
    { city: "Lisboa", country: "Portugal", coords: { lat: 38.7223, lng: -9.1393 } },
    { city: "Tóquio", country: "Japão", coords: { lat: 35.6762, lng: 139.6503 } },
    { city: "Berlim", country: "Alemanha", coords: { lat: 52.5200, lng: 13.4050 } },
    { city: "Dublin", country: "Irlanda", coords: { lat: 53.3498, lng: -6.2603 } },
    { city: "Paris", country: "França", coords: { lat: 48.8566, lng: 2.3522 } },
    { city: "Roma", country: "Itália", coords: { lat: 41.9028, lng: 12.4964 } },
    { city: "Sydney", country: "Austrália", coords: { lat: -33.8688, lng: 151.2093 } },
    { city: "Buenos Aires", country: "Argentina", coords: { lat: -34.6037, lng: -58.3816 } },
    { city: "Vancouver", country: "Canadá", coords: { lat: 49.2827, lng: -123.1207 } },
    { city: "Seul", country: "Coreia do Sul", coords: { lat: 37.5665, lng: 126.9780 } },
    { city: "Florença", country: "Itália", coords: { lat: 43.7696, lng: 11.2558 } },
    { city: "Madri", country: "Espanha", coords: { lat: 40.4168, lng: -3.7038 } },
    { city: "Amsterdã", country: "Holanda", coords: { lat: 52.3676, lng: 4.9041 } },
    { city: "Kyoto", country: "Japão", coords: { lat: 35.0116, lng: 135.7681 } },
    { city: "Cidade do Cabo", country: "África do Sul", coords: { lat: -33.9249, lng: 18.4241 } },
    { city: "Praga", country: "República Tcheca", coords: { lat: 50.0755, lng: 14.4378 } },
    { city: "Bangkok", country: "Tailândia", coords: { lat: 13.7563, lng: 100.5018 } },
    { city: "Montreal", country: "Canadá", coords: { lat: 45.5017, lng: -73.5673 } },
    { city: "Londres", country: "Reino Unido", coords: { lat: 51.5074, lng: -0.1278 } },
    { city: "Barcelona", country: "Espanha", coords: { lat: 41.3851, lng: 2.1734 } },
    { city: "São Francisco", country: "EUA", coords: { lat: 37.7749, lng: -122.4194 } },
    { city: "Reykjavik", country: "Islândia", coords: { lat: 64.1466, lng: -21.9426 } },
    { city: "Cusco", country: "Peru", coords: { lat: -13.5320, lng: -71.9675 } },
    { city: "Bali", country: "Indonésia", coords: { lat: -8.3405, lng: 115.0920 } },
    { city: "Queenstown", country: "Nova Zelândia", coords: { lat: -45.0312, lng: 168.6626 } }
];

const includesItems = ["Mensalidades", "Acomodação Verificada", "Atividades Culturais", "Suporte Local 24/7", "Seguro Viagem", "Material do Curso", "Passe de Transporte Público", "Workshop de Segurança", "Sessão de Mentoria", "Kit de Boas-vindas"];

const getRandom = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];
const getRandomSubset = (arr: any[], n: number) => [...arr].sort(() => 0.5 - Math.random()).slice(0, n);
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
// Função auxiliar para embaralhar array
const shuffle = (array: any[]) => [...array].sort(() => 0.5 - Math.random());

// --- GENERATE AGENCIES (20) ---
export const agencies: Agency[] = Array.from({ length: 20 }, (_, i) => {
    // 40% (8 agências) terão os 3 selos
    const isFullSealed = i < 8; 
    
    let agencysCerts: string[] = [];

    if (isFullSealed) {
        // Recebe todos os 3
        agencysCerts = [...CERTIFICATIONS];
    } else {
        // Recebe uma combinação de 1 ou 2 selos (não os 3)
        // 60% chance de ter 2 selos, 40% chance de ter 1 selo
        const numCerts = Math.random() > 0.4 ? 2 : 1;
        agencysCerts = shuffle(CERTIFICATIONS).slice(0, numCerts);
    }
    
    return {
        id: i + 1,
        name: agenciesData[i].name,
        logo: agenciesData[i].logo,
        isVerified: isFullSealed,
        verificationReason: isFullSealed 
            ? "Verificada por possuir o ciclo completo de segurança: Suporte, Exclusividade e Saúde." 
            : "Verificada pela Women Go Safe por bom histórico de feedback e compromisso com a segurança das alunas.",
        description: `Agência especializada em ${getRandom(programSubjects)} e ${getRandom(programSubjects)}.`,
        certifications: agencysCerts,
    };
});

// --- GENERATE FEEDBACKS (300) ---
export const feedbacks: Feedback[] = Array.from({ length: 300 }, (_, i) => {
    const seed = Math.random();
    let rating;
    if (seed < 0.8) { // 80% chance of positive review (4-5 stars)
        rating = randomInt(4, 5);
    } else if (seed < 0.9) { // 10% chance of neutral (3 stars)
        rating = 3;
    } else { // 10% chance of negative (1-2 stars)
        rating = randomInt(1, 2);
    }

    let comment = "";
    if (rating >= 4) comment = getRandom(positiveComments);
    else if (rating === 3) comment = getRandom(neutralComments);
    else comment = getRandom(negativeComments);

    return {
        id: i + 1,
        author: `${getRandom(firstNames)} ${getRandom(lastNames)[0]}.`,
        avatar: `https://loremflickr.com/150/150/woman,women,portrait?lock=${i}`,
        rating: rating,
        comment: comment,
        date: `202${randomInt(2, 4)}-${String(randomInt(1, 12)).padStart(2, '0')}-${String(randomInt(1, 28)).padStart(2, '0')}`,
    };
}).sort(() => 0.5 - Math.random()); // Shuffle for random assignment later

// --- GENERATE PROGRAMS (100) ---
let feedbackCounter = 0;
export const programs: Program[] = Array.from({ length: 100 }, (_, i) => {
    const destination = getRandom(cities);
    const agency = getRandom(agencies); 
    const programType = getRandom(programTypes);
    const programSubject = getRandom(programSubjects);

    // Assign feedbacks
    const numFeedbacks = randomInt(2, 4);
    const assignedFeedbacks = feedbacks.slice(feedbackCounter, feedbackCounter + numFeedbacks);
    feedbackCounter = (feedbackCounter + numFeedbacks);
    if (feedbackCounter >= feedbacks.length) {
        feedbackCounter = 0; // Loop back
    }

    return {
        id: i + 1,
        name: `${programType} ${programSubject} em ${destination.city}`,
        agency: agency,
        destinationCity: destination.city,
        destinationCountry: destination.country,
        price: randomInt(1500, 5000),
        shortDescription: `Explore ${programSubject.toLowerCase()} na vibrante cidade de ${destination.city}. Uma experiência única oferecida por ${agency.name}.`,
        longDescription: `Este programa imersivo em ${destination.city} oferece uma oportunidade única de aprofundar seus conhecimentos em ${programSubject.toLowerCase()}. Com o suporte da ${agency.name}, você terá acesso a workshops, atividades culturais e uma rede de apoio sólida, garantindo uma jornada segura e enriquecedora. Ideal para quem busca crescimento pessoal e profissional no exterior.`,
        includes: getRandomSubset(includesItems, randomInt(4, 7)),
        feedbacks: assignedFeedbacks.length > 0 ? assignedFeedbacks : [feedbacks[i % feedbacks.length]],
        image: `https://picsum.photos/seed/${destination.city.replace(/\s/g, '')}${i}/800/600`,
        purchaseCount: randomInt(5, 150),
    };
});


// --- GENERATE CITY SAFETY DATA ---
const uniqueCities = [...new Map(programs.map(p => [`${p.destinationCity}-${p.destinationCountry}`, p])).values()].map(p => ({
    city: p.destinationCity,
    country: p.destinationCountry,
    coords: cities.find(c => c.city === p.destinationCity)?.coords || { lat: 0, lng: 0 }
}));

export const citySafetyData: CitySafetyData[] = uniqueCities.map((cityInfo, i) => {
    const cityPrograms = programs.filter(p => p.destinationCity === cityInfo.city);
    const cityFeedbacks = cityPrograms.flatMap(p => p.feedbacks);
    const totalFeedbacks = cityFeedbacks.length;
    const positiveFeedbacks = cityFeedbacks.filter(f => f.rating >= 4).length;
    const positiveFeedbackPercentage = totalFeedbacks > 0 ? Math.round((positiveFeedbacks / totalFeedbacks) * 100) : 70;
    
    let safetyStatus: SafetyStatus = 'Neutral';
    if (totalFeedbacks < 5) {
        safetyStatus = 'Neutral';
    } else if (positiveFeedbackPercentage >= 80) {
        safetyStatus = 'Green';
    } else if (positiveFeedbackPercentage >= 60) {
        safetyStatus = 'Yellow';
    } else {
        safetyStatus = 'Red';
    }

    return {
        id: i + 1,
        cityName: cityInfo.city,
        countryName: cityInfo.country,
        safetyStatus: safetyStatus,
        positiveFeedbackPercentage: positiveFeedbackPercentage,
        totalFeedbacks: totalFeedbacks,
        coords: cityInfo.coords,
        radius: randomInt(8, 20) * 10000,
    };
});

// --- KNOWLEDGE HUB COURSES ---
const coursePartners = ["Equipe Women Go Safe", "Global Connect Institute", "Smart Money Abroad", "Alumni Women Go Safe", "Career Builders", "Cultural Insights Co."];
const courseInstructors = ["Maria Reis", "Dra. Aiko Tanaka", "Chloe Davis", "Ana Pereira", "Juliana Costa", "Renata Alves", "Beatriz Lima", "Carla Martins"];

const discounts = [30, 35, 40, 45, 50];
const getRandomDiscount = () => discounts[Math.floor(Math.random() * discounts.length)];

const getDiscount = () => {
    if (Math.random() < 0.5) {
        return 100;
    }
    return getRandomDiscount();
};


export const courses: Course[] = programs.flatMap((program, index) => {
    
    const course: Course = {
        id: (index * 2) + 1,
        type: 'Curso',
        title: `Curso de Imersão Cultural para ${program.destinationCity}`,
        description: `Prepare-se para sua experiência em ${program.destinationCity}. Este curso aborda costumes locais, dicas de segurança e frases essenciais para uma adaptação tranquila e enriquecedora.`,
        instructor: getRandom(courseInstructors),
        partner: getRandom(coursePartners),
        price: Math.round(program.price * 0.1),
        programId: program.id,
        discountPercentage: getDiscount(),
        purchaseCount: randomInt(3, 80),
    };

    const mentorship: Course = {
        id: (index * 2) + 2,
        type: 'Mentoria',
        title: `Mentoria de Carreira em ${program.destinationCity}`,
        description: `Conecte-se com uma mentora que já viveu a experiência de intercâmbio em ${program.destinationCity} e receba conselhos práticos para alavancar sua carreira durante e após o programa.`,
        instructor: getRandom(courseInstructors),
        partner: "Alumni Women Go Safe",
        price: Math.round(program.price * 0.1),
        programId: program.id,
        discountPercentage: getDiscount(),
        purchaseCount: randomInt(2, 50),
    };

    return [course, mentorship];
});
