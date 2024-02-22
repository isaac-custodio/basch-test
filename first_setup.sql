INSERT INTO permissions (title, description, created_at, updated_at)
VALUES ('admin', 'Primeira permissão, maior em hirarquia', current_timestamp, current_timestamp)
-- 

-- para o endpoint login, a senha é (@Rosquinha420) 
INSERT INTO users (username, password, email, name)
VALUES ('roberto', '$2y$05$pcpg074H7N08m5B703L5heimO9pMSen8hQnI1TYQ8kR/whpU8Rw9m', 'roberto@company.com', 'Roberto'), 
--

-- Adiciona permissão de admin ao primeiro usuário
INSERT INTO user_permissions (user_id, permission_id)
VALUES (1, 1)