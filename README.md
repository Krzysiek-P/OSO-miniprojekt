# OSO-miniprojekt

Mini-Projekt: DevSecOps dla podatnej aplikacji webowej
Cel projektu
Celem projektu jest praktyczne zapoznanie się z koncepcją DevSecOps poprzez zbudowanie
pipeline’u CI/CD, który automatyzuje procesy budowania, testowania, analizy
bezpieczeństwa i (opcjonalnie) wdrożenia podatnej aplikacji webowej. Projekt ma na celu
pokazanie, jak zintegrować testy bezpieczeństwa z codzienną pracą zespołów
developerskich przy pomocy narzędzi CI/CD.

Krok 1: Wybór aplikacji
1. Wybierz podatną aplikację z katalogu: https://owasp.org/www-project-vulnerable-webapplications-directory
2. Przykłady: Juice Shop, DVWA, WebGoat, Mutillidae, Security Shepherd.
3. Upewnij się, że aplikacja działa lokalnie i może być uruchomiona w kontenerze Docker.
   
Krok 2: Repozytorium
1. Utwórz repozytorium z kodem aplikacji na GitHubie, GitLabie lub innej platformie z
obsługą CI/CD.
2. Dodaj konfigurację pipeline'u (.github/workflows/devsecops.yml lub .gitlab-ci.yml).
   
Krok 3: Pipeline CI/CD

Etap 1: Budowanie aplikacji, testowanie i budowanie obrazu Docker
- Utwórz plik Dockerfile (lub docker-compose.yml) do zbudowania aplikacji jako kontener
(jeżeli nie jest jeszcze obecny).
- Zbuduj obraz w CI, np.:
 docker build -t twoja_aplikacja:latest .

Etap 2: Testy bezpieczeństwa aplikacji
Typ skanu    Opis                         Narzędzia                                             Wymagania
SCA          Skan bibliotek i zależności  OWASP DependencyCheck, npm audit, pip-audit, Snyk     Napraw min. 2–3 podatności High/Critical
SAST         Skan kodu źródłowego         Semgrep, SonarQube, Bandit, Brakeman                  Napraw min. 2–3 podatności High/Critical
Secrets      Skan Wykrywanie sekretów     GitLeaks, TruffleHog                                  Usuń/przenieś min. 2–3 znaleziska  High/Critical
DAST         Skan działającej aplikacji   OWASP ZAP CLI, Nikto                                  Tymczasowy deployment w CI (Docker-in-Docker); napraw min. 2–3 podatności High/Critical

Tymczasowy deployment do DAST (Docker-in-Docker)
- W CI/CD (GitHub Actions, GitLab CI) uruchom aplikację tymczasowo w kontenerze.
- Zrób to z wykorzystaniem Docker-in-Docker (DinD).
- Aplikacja powinna być dostępna lokalnie (np. http://localhost:3000) i gotowa do
dynamicznego skanowania przez DAST.
Materiały:
- GitHub Actions z DinD: https://datawookie.dev/blog/2024/04/dind-in-github-actions/
- GitLab DinD: https://docs.gitlab.com/ee/ci/docker/using_docker_build.html

Etap 3: Skan obrazu kontenera przed wypchnięciem
- Przeprowadź skan obrazu jeszcze przed jego publikacją.
- Rekomendowane narzędzie: Trivy (https://github.com/aquasecurity/trivy)
 Przykład:
 trivy image --severity HIGH,CRITICAL twoja_aplikacja:latest
- Wygeneruj raport i napraw minimum 2–3 podatności High lub Critical (np. aktualizując
bazowy obraz).

Etap 4: Push do rejestru kontenerów
- Po pomyślnym skanie i naprawach, wypchnij obraz do:
 - docker.io (Docker Hub)
 - quay.io
 - lub prywatnego rejestru (np. GitLab Container Registry)

Krok 4: (Opcjonalnie) Deployment końcowy
Po etapie bezpieczeństwa i publikacji obrazu możesz wdrożyć aplikację na:
- Heroku, Railway, Render, Vercel
- Dokku (na własnym VPS, np. Oracle Free Tier) – https://dokku.com/
Kryteria zaliczenia
W sprawozdaniu należy zawrzeć opis poniższych sekcji:
1. Pipeline zbudowany zgodnie z zasadami CI/CD i DevSecOps.
2. Obraz Docker:
 - zbudowany,
 - przeskanowany Trivy,
 - wypchnięty do publicznego rejestru (np. Docker Hub).
3. Każdy skan (SCA, SAST, Secrets, DAST) zawiera minimum 2–3 poprawione podatności
High/Critical.
4. DAST wykorzystuje tymczasowy deployment w CI.
5. (Opcjonalnie) Działa etap deploymentu końcowego.
Przykładowe narzędzia
Etap                 Narzędzie              Link
Konteneryzacja       Docker                 https://www.docker.com
Skan obrazu          Trivy                  https://github.com/aquasecurity/trivy
Rejestr kontenerów   Docker Hub             https://hub.docker.com
SCA                  Dependency-Check       https://owasp.org/www-project-dependency-check
SAST                 Semgrep                https://semgrep.dev
Secrets Scan         GitLeaks               https://github.com/gitleaks/gitleaks
DAST                 OWASP ZAP Docker       https://owasp.org/www-project-zap
Hosting              Dokku                  https://dokku.com
