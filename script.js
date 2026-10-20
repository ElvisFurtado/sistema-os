import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAfkR_pn2-QHEXSpndmTUEHrNtn4E2FndU",
  authDomain: "os-furtado-reparacoes.firebaseapp.com",
  projectId: "os-furtado-reparacoes",
  storageBucket: "os-furtado-reparacoes.firebasestorage.app",
  messagingSenderId: "656707801667",
  appId: "1:656707801667:web:a2eb560bf9ee5233ee3af6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const formOS = document.getElementById('form-os');

formOS.addEventListener('submit', function(event) {
    event.preventDefault();

    const numeroOS = Math.floor(Math.random() * 90000) + 10000; 

    const novaOS = {
        numero: numeroOS,
        dataCriacao: new Date().toLocaleDateString('pt-PT'),
        timestamp: Date.now(),
        cliente: document.getElementById('nomeCliente').value,
        contato: document.getElementById('contatoCliente').value,
        tipoEquipamento: document.getElementById('tipoEquipamento').value,
        modelo: document.getElementById('modeloEquipamento').value,
        especificacoes: document.getElementById('especificacoes').value,
        tipoServico: document.getElementById('tipoServico').value,
        descricao: document.getElementById('descricaoProblema').value,
        status: 'aberta'
    };

    addDoc(collection(db, "ordensServico"), novaOS).catch((e) => {
        console.log("Aviso do Firebase (bloqueador detectado, mas o WhatsApp vai abrir):", e);
    });

    const mensagem = `*NOVA ORDEM DE SERVIÇO - FURTADO REPARAÇÕES* 💻\n\n` +
                     `*OS Nº:* ${novaOS.numero}\n` +
                     `*Data:* ${novaOS.dataCriacao}\n` +
                     `*Cliente:* ${novaOS.cliente}\n` +
                     `*Contacto:* ${novaOS.contato}\n\n` +
                     `*Equipamento:* ${novaOS.tipoEquipamento.toUpperCase()} - ${novaOS.modelo}\n` +
                     `*Especificações:* ${novaOS.especificacoes || 'N/A'}\n\n` +
                     `*Serviço:* ${novaOS.tipoServico}\n` +
                     `*Descrição:* ${novaOS.descricao}`;

    const textoCodificado = encodeURIComponent(mensagem);
    const numeroWhatsApp = "5519992811795"; 
    const urlWhatsApp = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${textoCodificado}`;

    formOS.reset();
    window.open(urlWhatsApp, '_blank');
});
