-- SQLite
-- Inserindo 10 comidas na tabela foods
INSERT INTO foods (name, calories, carbs, fat, protein, created_at, updated_at) VALUES
('Banana', 89, 23.0, 0.3, 1.1, datetime('now'), datetime('now')),
('Frango Grelhado', 165, 0.0, 3.6, 31.0, datetime('now'), datetime('now')),
('Arroz Integral', 111, 23.0, 0.9, 2.6, datetime('now'), datetime('now')),
('Ovo Cozido', 78, 0.6, 5.3, 6.3, datetime('now'), datetime('now')),
('Maçã', 52, 14.0, 0.2, 0.3, datetime('now'), datetime('now')),
('Salmão', 208, 0.0, 13.0, 20.0, datetime('now'), datetime('now')),
('Batata Doce', 86, 20.1, 0.1, 1.6, datetime('now'), datetime('now')),
('Amêndoas', 579, 21.6, 49.9, 21.2, datetime('now'), datetime('now')),
('Iogurte Natural', 59, 3.6, 3.3, 5.0, datetime('now'), datetime('now')),
('Abacate', 160, 8.5, 14.7, 2.0, datetime('now'), datetime('now'));

-- Inserindo 10 exercícios na tabela exercises
INSERT INTO exercises (name, created_at, updated_at) VALUES
('Supino Reto', datetime('now'), datetime('now')),
('Agachamento Livre', datetime('now'), datetime('now')),
('Levantamento Terra', datetime('now'), datetime('now')),
('Rosca Direta', datetime('now'), datetime('now')),
('Flexão de Braço', datetime('now'), datetime('now')),
('Corrida na Esteira', datetime('now'), datetime('now')),
('Cadeira Extensora', datetime('now'), datetime('now')),
('Remada Baixa', datetime('now'), datetime('now')),
('Prancha Abdominal', datetime('now'), datetime('now')),
('Polichinelo', datetime('now'), datetime('now'));
