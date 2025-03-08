-- Habilitar extensión para UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabla mesas
CREATE TABLE mesas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    numero INT UNIQUE NOT NULL CHECK (numero > 0),
    capacidad INT NOT NULL CHECK (capacidad BETWEEN 1 AND 20)
);

-- Tabla eventos
CREATE TABLE eventos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(100) NOT NULL,
    fecha TIMESTAMPTZ NOT NULL CHECK (fecha > NOW()),
    descripcion TEXT
);

-- Tabla reservaciones
CREATE TABLE reservaciones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mesa_id UUID REFERENCES mesas(id) ON DELETE CASCADE,
    evento_id UUID REFERENCES eventos(id) ON DELETE CASCADE,
    cliente_nombre VARCHAR(100) NOT NULL,
    cliente_email VARCHAR(255) NOT NULL,
    fecha TIMESTAMPTZ NOT NULL CHECK (fecha > NOW()),
    status VARCHAR(20) NOT NULL CHECK (status IN ('pendiente', 'confirmada', 'cancelada')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla notificaciones
CREATE TABLE notificaciones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reservacion_id UUID REFERENCES reservaciones(id) ON DELETE CASCADE,
    tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('email', 'sms')),
    mensaje TEXT NOT NULL,
    enviado BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla historial_reservaciones
CREATE TABLE historial_reservaciones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reservacion_id UUID REFERENCES reservaciones(id) ON DELETE CASCADE,
    status_anterior VARCHAR(20),
    status_nuevo VARCHAR(20),
    changed_at TIMESTAMPTZ DEFAULT NOW()
);