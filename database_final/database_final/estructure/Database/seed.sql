-- Insertar mesas
INSERT INTO mesas (numero, capacidad) VALUES
(1, 4), (2, 6), (3, 8), (4, 2), (5, 10),
(6, 12), (7, 4), (8, 6), (9, 8), (10, 10);

-- Insertar eventos
INSERT INTO eventos (nombre, fecha, descripcion) VALUES
('Festival Gastronómico', NOW() + INTERVAL '5 days', 'Evento de degustación'),
('Concierto Noche', NOW() + INTERVAL '10 days', 'Concierto en vivo'),
('Taller de Cocina', NOW() + INTERVAL '15 days', 'Clase magistral');

-- Insertar reservaciones
INSERT INTO reservaciones (mesa_id, evento_id, cliente_nombre, cliente_email, fecha, status)
SELECT 
    (SELECT id FROM mesas WHERE numero = FLOOR(1 + random()*10)),
    (SELECT id FROM eventos WHERE nombre = 'Festival Gastronómico'),
    'Cliente ' || generate_series,
    'cliente' || generate_series || '@ejemplo.com',
    NOW() + (generate_series || ' days')::INTERVAL,
    CASE WHEN generate_series % 2 = 0 THEN 'pendiente' ELSE 'confirmada' END
FROM generate_series(1,5);

-- Insertar notificaciones manuales para pruebas
INSERT INTO notificaciones (reservacion_id, tipo, mensaje, enviado)
SELECT id, 'email', 'Recordatorio: ' || cliente_nombre, true
FROM reservaciones
WHERE status = 'confirmada';

-- Insertar historial inicial
INSERT INTO historial_reservaciones (reservacion_id, status_anterior, status_nuevo)
SELECT id, 'creada', status
FROM reservaciones;