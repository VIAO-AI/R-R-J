-- Índices para reservaciones
CREATE INDEX idx_reservaciones_fecha ON reservaciones(fecha);
CREATE INDEX idx_reservaciones_mesa_id ON reservaciones(mesa_id);
CREATE INDEX idx_reservaciones_evento_id ON reservaciones(evento_id);

-- Índices para eventos
CREATE INDEX idx_eventos_fecha ON eventos(fecha);

-- Índices para notificaciones
CREATE INDEX idx_notificaciones_reservacion ON notificaciones(reservacion_id);
CREATE INDEX idx_notificaciones_enviado ON notificaciones(enviado);