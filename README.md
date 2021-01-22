# software-security-web-app

Frontend Application for assignment 2 - Software Security

This is a React application regarding products for a music store. This music store only sells vinyl and apparel (merch). The service is publically available at https://www.brechtheldens.xyz

## Privacy Policy

To be found at https://www.brechtheldens.xyz/privacy

## Processing Register (dutch)

### Contactgegevens:

- Bedrijfsnaam: EWJ
- Adres: Cardijnstraat 192A, 1980 Eppegem
- e-mailadres: brecht.heldens@student.ehb.be
- telefoonnummer: +32 493 83 85 663
- Verantwoordelijke: John Doe, e-mailadres: john.doe@example.com, telefoonnummer: +32 493 83 85 663

### Verwerkingsactiviteiten van reguliere persoonsgegevens:

- Categorie persoonsgegeven(s): Naam, adres, woonplaats
- Categorie betrokkenen: Klanten
- Grondslag voor de verwerking: Overeenkomst
- Doel verwerking: Dienstverlening, Verwerking bestellingen
- Zelf verwerken: Ja
- Waar bevindt zich de verwerker? Binnen de EU of in een land met voldoende juridische waarborgen
- EU Verwerkingsovereenkomst? Neen (Niet vereist)
- Bewaartermijn: Tot gebruiker zijn profiel verwijdert
- Veiligheidsmaatregelen: Encryptie persoonsgegevens

- Categorie persoonsgegeven(s): E-mailadres/telefoonnummer
- Categorie betrokkenen: Klanten
- Grondslag voor de verwerking: Overeenkomst
- Doel verwerking: Dienstverlening, Verwerking bestellingen
- Zelf verwerken: Ja
- Waar bevindt zich de verwerker? Binnen de EU of in een land met voldoende juridische waarborgen
- EU Verwerkingsovereenkomst? Neen (Niet vereist)
- Bewaartermijn: Tot gebruiker zijn profiel verwijdert
- Veiligheidsmaatregelen: Encryptie persoonsgegevens

### Verwerkingsactiviteiten van bijzondere persoonsgegevens: NVT

Datum aanmaken register: 19 januari 2021

## Auth0 (Identity Provider)

Making use of Auth0, an alternative to the HIBP api has been implemented, making use of Auth0's Password Dictionary. This is a list containing 10.000 of the most frequently used passwords.

Exponentially increasing a time interval between failed login attempts could not be implemented due to Auth0 managing the login and register flow.

## Prevention of common web vulnerabilities

### XSS and XSSI

User input is never added in any JavaScript URL's or in the DOM using dangerouslySetInnerHTML.

### Clickjacking

The header 'X-FRAME-OPTIONS' is automatically set with every incoming request. A custom Cloudflare worker (script) appends this header.

### CSRF Mitigation

Auth0 is used as identity provider. Upon login, the accesstoken is kept in memory at all times without setting a cookie.

### Notifications regarding dependency vulnerabilities

GitHub dependabot is enabled on this repo, informing me about any possible vulnerabilities.
