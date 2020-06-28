# Bot Alaraco
Bot alaraco para mi y los panas

## Contenido
El prefijo que se requiere para ejecutar un comando es **$**.

| Comandos |            Descripción                 |
|----------|----------------------------------------|
|   help   |    Lista todos los comandos.
|   ano    |    Te muestra a un señor que es un ejemplo a seguir.
|   ayuda  |    Puedes realizarle una pregunta al bot. Lo sabe todo.
|   dado   |    Tira un dado de 6 caras. Si le pasas un numero, serán las caras del dado (`$dado 20`).
|   grep   |    Prueba del stack de pintoes.
|   moneda |    Tira una moneda.
|   ping   |    Muestra el ping del bot.
|	wiki   |	Te envia el resumen de una búsqueda específica. Usa `$help wiki` para saber como usarlo.
|	play   |	Reproduce un video de youtube dado un URL.

## config.json
Se necesita un archivo llamado `config.json` que contenga lo siguiente:
* "prefix" (prefijo para llamar a los comandos)
* "token" (token del bot de Discord)
* "youtubeAPI" (token del API de YouTube)
