# use-send-test

API de exemplo em **NestJS** que demonstra o envio de e-mails com anexo utilizando a biblioteca [`usesend-js`](https://github.com/usesend/usesend-js) integrada a uma instância **self-hosted** do [UseSend](https://usesend.com).

---

## Como funciona

```
Cliente (HTTP multipart/form-data)
        │
        │  POST /use-send
        │  Body: { email: "destino@example.com" }
        │  File: arquivo qualquer (campo "file")
        ▼
UseSendController
        │
        ▼
UseSendService
        │  Instancia UseSend(apiKey, baseUrl)
        │  Converte o buffer do arquivo para Base64
        │  Monta o payload com from, to, subject, html e attachments
        ▼
UseSend (self-hosted)
        │
        ▼
E-mail entregue ao destinatário com o arquivo como anexo
```

### Fluxo detalhado

1. O cliente faz uma requisição `POST /use-send` com `multipart/form-data` contendo o campo `email` (endereço de destino) e o campo `file` (arquivo a ser anexado).
2. O `UseSendController` recebe o e-mail via `@Body` e o arquivo via `@UploadedFile`, usando o `FileInterceptor` do Multer para processar o upload em memória.
3. O `UseSendService` é chamado com esses dois parâmetros. Ele lê as credenciais a partir das variáveis de ambiente (`USESEND_API_KEY`, `USESEND_FROM`, `USESEND_BASE_URL`) configuradas pelo `ConfigService`.
4. O serviço instancia o cliente `UseSend` apontando para a URL da sua instância self-hosted (`USESEND_BASE_URL`) e chama `usesend.emails.send(...)` com o anexo convertido para Base64.
5. A resposta da API do UseSend é retornada diretamente ao cliente.

---

## Configuração de ambiente

Copie o arquivo de exemplo e preencha os valores:

```bash
cp .env.example .env
```

| Variável            | Descrição                                                  |
|---------------------|------------------------------------------------------------|
| `USESEND_API_KEY`   | API Key gerada no painel do seu UseSend self-hosted        |
| `USESEND_FROM`      | Endereço de e-mail remetente configurado na sua instância  |
| `USESEND_BASE_URL`  | URL base da sua instância self-hosted (ex: `https://mail.suaempresa.com`) |

> **Atenção:** o `USESEND_BASE_URL` é obrigatório porque a instância é self-hosted. Sem ele, o cliente `usesend-js` não saberá para qual servidor enviar as chamadas.

Exemplo de `.env`:

```env
USESEND_API_KEY=sua_api_key_aqui
USESEND_FROM=noreply@suaempresa.com
USESEND_BASE_URL=https://mail.suaempresa.com
```

---

## Instalação e execução

```bash
# Instalar dependências
npm install

# Desenvolvimento (com hot-reload)
npm run start:dev

# Produção
npm run build
npm run start:prod
```

A API sobe por padrão na porta **3000**.

---

## Exemplo de requisição

Usando `curl`:

```bash
curl -X POST http://localhost:3000/use-send \
  -F "email=destino@example.com" \
  -F "file=@/caminho/para/arquivo.pdf"
```

Ou via Postman:
- Método: `POST`
- URL: `http://localhost:3000/use-send`
- Body: `form-data`
  - `email` → texto com o endereço de destino
  - `file` → arquivo de qualquer tipo

---

## Estrutura do projeto

```
src/
├── app/
│   ├── app.module.ts           # Módulo raiz; registra ConfigModule (global) e UseSendModule
│   ├── app.controller.ts
│   └── app.service.ts
└── use-send/
    ├── use-send.module.ts      # Módulo do UseSend
    ├── use-send.controller.ts  # Endpoint POST /use-send
    └── use-send.service.ts     # Integração com usesend-js
```
# use-send-test
