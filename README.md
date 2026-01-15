# Plataforma SaaS para gestion de inventarios

Sistema front end para la gestion de inventario basado en plantillas, con dashboard administrativo y sistema de autenticacion completo basado en tokens JWT. Este es un MVP que apunta a solucionar la problematica de negocios pequeños en Chile en cuanto a la gestion de inventarios, este software busca reemplazar a excel como fuente de recopilacion de datos de negocios como retail, carnicerias, ferreterias, minimarket, etc.

## Demo y Credenciales
- **Base:**: https://inventory-saas-client.vercel.app/
- **Email:** user5@example.com
- **Password:** password123
## Motivacion
El proyecto nace a partir de mi formación teórica en Administración de Empresas y trabajos de apoyo a pequeñas empresas, donde se gestionaban inventarios y procesos operativos mediante Excel, con limitaciones en control, escalabilidad y trazabilidad.

## Tecnologias
- React/Next.js
- Tailwind CSS
- Shadcn/ui

## Infraestructura
- Git

## Funcionalidades
- Autenticacion completa con JWT
- Proceso de onboarding inicial para nuevos usuarios.
- Dashboard administrativo
- Integracion frontend-backend via API REST.

## Arquitectura
Proyecto dividido en dos repositorios.
- inventory_saas_client -> Frontend (React / Next.js)
- inventory-saas -> Backend (Django REST Framework)
El frontend consume la API REST mediante autenticación JWT.

## Estado del proyecto
Proyecto en desarrollo activo.
