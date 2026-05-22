export let medico = [];
export let paciente = [];
export let consulta = [];

let medicoId = 1;
let pacienteId = 1;
let consultaId = 1;

export const proximoMedicoId = () => medicoId++;
export const proximoPacienteId = () => pacienteId++;
export const proximaConsultaId = () => consultaId++;