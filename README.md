# Aplicació Web TFG

Aquest repositori conté el codi font del meu Treball Final de Grau, una aplicació web full‑stack amb .NET Core al backend i React + TypeScript al frontend. El desenvolupament es divideix en tres etapes clau, cadascuna reflectida en commits o branques específiques:

1. **Punt de partida (codi base)**  
   - Commit: `a8d387a` (**End of section 21**)  
   - Segueix el curs de Udemy [_Complete Guide to Building an App with .NET Core and React_](https://www.udemy.com/course/complete-guide-to-building-an-app-with-net-core-and-react/?course_id=2472180) i el seu [repositori oficial](https://github.com/TryCatchLearn/Reactivities).  
   - Inclou només les funcionalitats essencials de React + .NET.

2. **Versió prèvia a la prova d’usabilitat**  
   - Branca: `dev-sqlite-preusabilitat`  
   - Commit base: `49abdd0` (“Improved loading visuals”)  
   - Versió que van utilitzar les usuàries però, amb a SQLite per facilitar tests locals.

3. **Codi final (producció)**  
   - Versió desplegada a Azure App Service amb Azure SQL Database.  
   - La guia de les accions i la versió publicada a la memòria.
   - Es pot utilitzar en local (instrucccions a sota) però es necessita Docker.
   - Hi ha una carpeta `Videos/Actuals` on es pot veure algunes de les accions que poden fer per rol. 

---

## Codi final

Aquesta és la versió actualment desplegada a **Azure App Service** amb **Azure SQL Database**. Per provar el codi localment es necessita tenir [docker](https://www.docker.com/products/docker-desktop/) instal·lat, i seguir les següents instruccions: 
```bash
git clone https://github.com/HelenaPruna/Reactivities-V2.git
cd Reactivities-V2
```
Arrencar el container:
```bash
docker-compose up -d
```
Si no tens instal·lat dotnet-ef:
```bash
dotnet tool install --global dotnet-ef 
```
Revisa que s'hagi creat el container i s'hagi activat. Aplica les migracions i executa el backend:
```bash
dotnet ef database drop -p Persistence -s API
cd client
npm install
npm run build
cd ..
cd API
dotnet watch
```
Podràs veure l'app a: https://localhost:5001 , i seguir la guia de la memòria.  


## Punt de partida  

https://github.com/user-attachments/assets/118cfdd6-c6fd-4b3c-8854-fdc4470072cd

### Prerequisits

- [.NET SDK v9](https://dotnet.microsoft.com/download)  
- [Node.js v20+](https://nodejs.org/) (funciona també amb v18+)  
- [git](https://git-scm.com/)

### Execució local

```bash
# Clonar repositori
git clone https://github.com/HelenaPruna/Reactivities-V2.git
cd Reactivities-V2

# Torna al commit de partida
git checkout a8d387a

# Neteja i restaura paquets
git clean -fdx           
dotnet clean
dotnet restore

# Frontend
cd client
npm install
npm run dev              
```
En un altre terminal: 
```bash
cd ../API
dotnet watch         
```
> **Nota:** si en el terminal API et surt el següent avís
> ```bash
> warn: icrosoft.AspNetCore.Server.Kestrel.Core.KestrelServer[8]
>     The ASP.NET Core developer certificate is not trusted. ...
> ```
> vol dir que el navegador no enviarà peticions HTTPS i, per tant, el client no es podrà connectar al backend.
>
> Per solucionar-ho obre powershell administrador (windows) o terminal (MacOS) i executa:
> ```bash
> dotnet dev-certs https --clean
> dotnet dev-certs https --trust
> ```
> I reinicia el API (`dotnet watch`).

L'aplicació hauria d'estar disponible al https://localhost:3000 amb els següents usuaris de prova: 
email: `maria@test.com`, `tatiana@test.com` o `roser@test.com`
Contrasenya: `Pa$$w0rd`

## Versió prèvia a la prova d’usabilitat

**Branca**: `dev-sqlite-preusabilitat`  
**Commit**: `49abdd0`

```bash
git fetch
git checkout dev-sqlite-preusabilitat
# Segueix els mateixos passos d’execució anteriors 
```
L'aplicació hauria d'estar disponible al https://localhost:3000 amb els següents usuaris de prova: 

email (usuària amb el rol admin): `tatiana@reactivities.com`,

email (usuària amb el rol organitzador): `cristina@reactivities.com`

email (usuària amb el rol observador): `antonia@reactivities.com`

Contrasenya: `Pa$$w0rd`





