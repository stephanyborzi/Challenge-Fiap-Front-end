import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken } from 'firebase/auth';
import { getFirestore, doc, setDoc, collection, query, getDocs, where, getDoc } from 'firebase/firestore';

const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

const defaultFirebaseConfig = { 
    apiKey: "mock-api-key", 
    authDomain: "mock-domain.firebaseapp.com", 
    projectId: "mock-project-id",
    storageBucket: "mock-bucket.appspot.com", 
    messagingSenderId: "mock-sender-id", 
    appId: "mock-app-id"
};

let isUsingMockConfig = true; 
let firebaseConfig = defaultFirebaseConfig;

if (typeof __firebase_config !== 'undefined' && __firebase_config) {
    try {
        const parsedConfig = JSON.parse(__firebase_config);
        if (parsedConfig && parsedConfig.projectId) {
            firebaseConfig = parsedConfig;
            isUsingMockConfig = false;
        } else {
            console.warn("Configuração real do Firebase está incompleta. Usando configuração mock.");
        }
    } catch (e) {
        console.error("Falha ao parsear __firebase_config. Usando configuração mock.", e);
    }
} else {
    console.warn("__firebase_config não definida. Usando configuração mock.");
}

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

let currentUserId = 'unknown';
const REGISTERED_EMPLOYEES_COLLECTION_PATH = `artifacts/${appId}/public/data/registered_employees`;

async function setupFirebase() {
    if (isUsingMockConfig) {
        console.warn("[AUTH WARNING] Pulando autenticação: Usando configuração mock do Firebase. Acesso ao Firestore será simulado.");
        return;
    }

    try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
            const userCredential = await signInWithCustomToken(auth, __initial_auth_token);
            currentUserId = userCredential.user.uid;
        } else {
            const userCredential = await signInAnonymously(auth);
            currentUserId = userCredential.user.uid;
        }
        console.log(`[AUTH] Firebase inicializado. User ID: ${currentUserId}`);
    } catch (error) {
        console.error("[AUTH ERROR] Falha no login do Firebase:", error);
    }
}
setupFirebase(); 

const app = express();
const PORT = 3001; 

app.use(cors()); 
app.use(bodyParser.json({ limit: '50mb' }));

const mockEmployeeDatabase = [];

// --- Funções de Simulação de Visão Computacional ---

/**
 * Simula a extração de descritores faciais de uma imagem.
 * @param {string} base64Image - A imagem capturada em Base64.
 * @returns {string} Descritor facial SIMULADO.
 */
function extractFacialFeatures(base64Image) {
    // Para SIMULAÇÃO: Retornamos um descritor genérico (baseado apenas no início da imagem),
    // pois a lógica de bloqueio de duplicidade será aplicada na função 'compareFaces' abaixo.
    return `descritores_simulados_da_imagem_${base64Image.substring(0, 10)}`; 
}

/**
 * Simula a comparação de um novo rosto (queryFeatures) com o banco de dados.
 * * NOTA: Esta função agora lida com a restrição de "ROSTO DUPLICADO"
 * @param {string} queryFeatures - Descritores do rosto atual.
 * @param {Array<object>} allRegisteredFaces - Dados de todos os funcionários cadastrados.
 * @param {boolean} isRegistrationCheck - Se TRUE, estamos no modo "impedir duplicidade".
 * @returns {object | null} Retorna o objeto do funcionário cadastrado se houver match, senão null.
 */
function compareFaces(queryFeatures, allRegisteredFaces, isRegistrationCheck = false) {
    if (allRegisteredFaces.length === 0) return null;

    // Lógica para simular a unicidade (ROSTO DUPLICADO)
    if (isRegistrationCheck) {
        // Se JÁ EXISTE um rosto cadastrado no banco, vamos forçar uma FALHA DE SIMILARIDADE
        // 90% das vezes, para simular a detecção do mesmo rosto com ID diferente.
        if (allRegisteredFaces.length > 0 && Math.random() < 0.90) {
            console.log("[SIMULAÇÃO - UNICIDADE] Match de similaridade forçado (Rosto Duplicado).");
            // Retorna o primeiro funcionário para simular que o rosto já pertence a ele
            return allRegisteredFaces[0]; 
        }
    }
    
    // Lógica para o reconhecimento (login)
    if (!isRegistrationCheck) {
        // Probabilidade de Match para login (70%)
        if (Math.random() < 0.7) { 
            const randomMatch = allRegisteredFaces[Math.floor(Math.random() * allRegisteredFaces.length)];
            return randomMatch;
        }
    }

    return null;
}

// --- Rota 1: CADASTRO FACIAL (Registo de um novo funcionário) ---
app.post('/api/register-face', async (req, res) => {
    const { employeeId, employeeName, imageData } = req.body;
    
    console.log(`\n[API INÍCIO] Recebida requisição de cadastro para ID: ${employeeId || 'NÃO FORNECIDO'}`);

    if (!employeeId || !employeeName || !imageData) {
        console.log(`[API FALHA] Cadastro falhou: Dados incompletos.`);
        return res.status(400).json({ success: false, message: "Dados incompletos: ID, Nome ou Imagem ausentes." });
    }

    try {
        // Extrai o descritor facial sem depender do ID (mais realista)
        const facialFeatures = extractFacialFeatures(imageData);
        let allRegisteredFaces = [];
        let existingIdMatch = false;

        // 1. Busca e Checagem de Duplicidade (ID)
        if (isUsingMockConfig) {
            allRegisteredFaces = mockEmployeeDatabase;
            if (allRegisteredFaces.some(emp => emp.employeeId === employeeId)) {
                existingIdMatch = true;
            }
        } else {
            const employeesRef = collection(db, REGISTERED_EMPLOYEES_COLLECTION_PATH);
            const q = query(employeesRef, where('employeeId', '==', employeeId));
            const existingDocs = await getDocs(q);

            if (!existingDocs.empty) {
                existingIdMatch = true;
            }
            const allDocsSnapshot = await getDocs(employeesRef);
            allRegisteredFaces = allDocsSnapshot.docs.map(doc => doc.data());
        }

        // Se o ID já estiver cadastrado, falha imediatamente
        if (existingIdMatch) {
            console.log(`[API FALHA] ID ${employeeId} já cadastrado.`);
            return res.status(409).json({ success: false, message: "Funcionário com este ID já possui cadastro facial. Use a função 'Cadastrar Outro' para um novo funcionário." });
        }
        
        // NOVO PASSO CRÍTICO: 2. Checa se o ROSTO já existe no banco de dados (mesmo com ID diferente).
        const faceMatch = compareFaces(facialFeatures, allRegisteredFaces, true); 

        if (faceMatch) {
            console.log(`[API FALHA] Rosto já encontrado, ID: ${faceMatch.employeeId}. BLOQUEIO DE DUPLICIDADE FACIAL.`);
            return res.status(409).json({ success: false, message: `Este rosto já está cadastrado no sistema (Funcionário: ${faceMatch.employeeName}). O cadastro de múltiplas identidades para o mesmo rosto não é permitido.` });
        }
        
        // Se passou pelas checagens, prossegue com o cadastro
        
        // --- LÓGICA DE SIMULAÇÃO (QUANDO EM AMBIENTE MOCK) ---
        if (isUsingMockConfig) {
            const newEmployee = { 
                employeeId, 
                employeeName, 
                features: facialFeatures,
                fullImageDataBase64: imageData,
            };
            mockEmployeeDatabase.push(newEmployee);
            console.log(`[MOCK SUCESSO] Cadastro concluído em memória para ID: ${employeeId}.`);
            return res.json({ 
                success: true, 
                message: `[MOCK] Rosto de ${employeeName} cadastrado com sucesso e persistente! (Em Memória)`,
                employeeId: employeeId
            });
        }
        // --- FIM DA LÓGICA DE SIMULAÇÃO ---


        // --- LÓGICA REAL DO FIRESTORE ---

        // 3. Salva no Firebase Firestore (Armazenamento Persistente)
        const docRef = doc(db, REGISTERED_EMPLOYEES_COLLECTION_PATH, employeeId);
        
        await setDoc(docRef, {
            employeeId: employeeId, 
            employeeName: employeeName,
            features: facialFeatures, 
            fullImageDataBase64: imageData, 
            timestamp: new Date().toISOString()
        });

        console.log(`[API SUCESSO] Cadastro concluído no Firestore para ID: ${employeeId}.`);
        res.json({ 
            success: true, 
            message: `Rosto de ${employeeName} cadastrado com sucesso e persistente!`,
            employeeId: employeeId
        });

    } catch (error) {
        console.error("[ERRO CADASTRO - FIRESTORE]", error);
        res.status(500).json({ success: false, message: "Erro interno no servidor ao persistir a imagem." });
    }
});

// --- Rota 2 e 3 (Reconhecimento e Imagem) permanecem as mesmas (mas usam o novo extractFacialFeatures) ---
app.post('/api/recognize-face', async (req, res) => {
    const { imageData } = req.body;
    
    console.log(`\n[API INÍCIO] Recebida requisição de reconhecimento.`);

    if (!imageData) {
        return res.status(400).json({ success: false, message: "Imagem não fornecida para reconhecimento." });
    }

    try {
        let allRegisteredFaces;

        if (isUsingMockConfig) {
            allRegisteredFaces = mockEmployeeDatabase;
            console.log(`[MOCK RECONHECIMENTO] Usando ${allRegisteredFaces.length} funcionários em memória.`);
        } else {
            const snapshot = await getDocs(collection(db, REGISTERED_EMPLOYEES_COLLECTION_PATH));
            allRegisteredFaces = snapshot.docs.map(doc => doc.data());
        }
        
        if (allRegisteredFaces.length === 0) {
            console.log("[API FALHA] Nenhum rosto cadastrado.");
            return res.json({ success: false, message: "Nenhum rosto cadastrado no banco de dados." });
        }
        
        // 2. Extrai as características do rosto atual (sem saber o ID)
        const queryFeatures = extractFacialFeatures(imageData); // Chamada corrigida

        // 3. Compara com o banco de dados (Simulação de Login)
        const match = compareFaces(queryFeatures, allRegisteredFaces, false); 

        if (match) {
            console.log(`[API SUCESSO] Reconhecimento MATCH: ${match.employeeName}`);
            res.json({ 
                success: true, 
                message: `Reconhecimento bem-sucedido! Bem-vindo(a), ${match.employeeName}.`,
                employee: { name: match.employeeName, id: match.employeeId }
            });
        } else {
            console.log("[API FALHA] Nenhum rosto encontrado.");
            res.json({ success: false, message: "Rosto não reconhecido ou não cadastrado." });
        }

    } catch (error) {
        console.error("[ERRO RECONHECIMENTO - FIRESTORE]", error);
        res.status(500).json({ success: false, message: "Erro interno no servidor." });
    }
});


app.get('/api/get-employee-image/:employeeId', async (req, res) => {
    const { employeeId } = req.params;
    
    console.log(`\n[API INÍCIO] Recebida requisição de imagem para ID: ${employeeId}`);

    try {
        let employeeData = null;

        if (isUsingMockConfig) {
            employeeData = mockEmployeeDatabase.find(emp => emp.employeeId === employeeId);
            console.log(`[MOCK IMAGEM] Buscando em memória.`);
        } else {
            const docRef = doc(db, REGISTERED_EMPLOYEES_COLLECTION_PATH, employeeId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                employeeData = docSnap.data();
            }
            console.log(`[FIRESTORE IMAGEM] Buscando no Firestore.`);
        }

        if (employeeData && employeeData.fullImageDataBase64) {
            console.log(`[API SUCESSO] Imagem encontrada para ID: ${employeeId}.`);
            res.json({ 
                success: true, 
                employeeId: employeeId,
                imageDataBase64: employeeData.fullImageDataBase64
            });
        } else {
            console.log(`[API FALHA] Imagem não encontrada para ID: ${employeeId}.`);
            res.status(404).json({ success: false, message: "Funcionário não encontrado ou imagem não cadastrada." });
        }

    } catch (error) {
        console.error("[ERRO ACESSO IMAGEM]", error);
        res.status(500).json({ success: false, message: "Erro interno ao buscar a imagem." });
    }
});


app.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`Servidor de Backend (API) rodando em http://localhost:${PORT}`);
    console.log(`Status de Persistência: ${isUsingMockConfig ? 'Simulada (Em Memória)' : 'Real (Firestore)'}`);
    console.log(`Rotas disponíveis:`);
    console.log(`- POST /api/register-face (Cadastro)`);
    console.log(`- POST /api/recognize-face (Reconhecimento)`);
    console.log(`- GET /api/get-employee-image/:employeeId (Recuperação de Imagem Salva)`);
    console.log(`======================================================\n`);
});