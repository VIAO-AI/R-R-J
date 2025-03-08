-- Función para enviar notificaciones
CREATE OR REPLACE FUNCTION enviar_notificacion_email()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO notificaciones (reservacion_id, tipo, mensaje)
    VALUES (NEW.id, 'email', 
        'Nueva reservación: ' || NEW.cliente_nombre || 
        ' para el evento ' || (SELECT nombre FROM eventos WHERE id = NEW.evento_id));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para notificaciones
CREATE TRIGGER trg_enviar_notificacion
AFTER INSERT ON reservaciones
FOR EACH ROW
EXECUTE FUNCTION enviar_notificacion_email();

-- Función para registrar cambios de estado
CREATE OR REPLACE FUNCTION log_cambios_reservacion()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.status IS DISTINCT FROM NEW.status THEN
        INSERT INTO historial_reservaciones (reservacion_id, status_anterior, status_nuevo)
        VALUES (OLD.id, OLD.status, NEW.status);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para historial
CREATE TRIGGER trg_log_cambios
AFTER UPDATE ON reservaciones
FOR EACH ROW
EXECUTE FUNCTION log_cambios_reservacion();