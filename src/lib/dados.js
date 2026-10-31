import turmasData from "../data/turmas.json";
import temas from "../data/temas.json";
import projetos from "../data/projetos.json";

export const turmas = turmasData.turmas;

// Temas reservados "(INSERIR TEMA)" nunca são exibidos.
export const temasValidos = temas.filter((t) => !t.nome.startsWith("(INSERIR"));

export const getTurma = (id) => turmas.find((t) => t.id === id);
export const getTema = (id) => temasValidos.find((t) => t.id === id);

const maisRecentes = (a, b) => b.dataPublicacao.localeCompare(a.dataPublicacao);

export const projetosPublicados = projetos
  .filter((p) => p.publicado)
  .sort(maisRecentes);

export const projetosDestaque = projetosPublicados
  .filter((p) => p.destaque)
  .slice(0, 6);