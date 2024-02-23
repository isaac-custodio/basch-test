INSERT INTO permissions (title, description, created_at, updated_at)
VALUES ('admin', 'Primeira permissão da hierarquia', current_timestamp, current_timestamp)
-- 
INSERT INTO users (username, password, email, name)
VALUES ('roberto', '$2a$05$nxCdmca5vOPgBgiPxw71i.pZWIPXPpk5CCwdwvS32px37PPuXmVsS', 'roberto@company.com', 'Roberto'), -- para o endpoint login, a senha é (@Rosquinha420)
--
-- Adiciona permissão de admin ao primeiro usuário
INSERT INTO user_permissions (user_id, permission_id)
VALUES (1, 1)