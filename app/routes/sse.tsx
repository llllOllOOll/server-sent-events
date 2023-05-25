import type { LoaderArgs } from "@remix-run/node";

export function loader({ request }: LoaderArgs) {
  return serverSentEvent(request.signal, (send: any) => {
    const interval = setInterval(() => {
      const person = getRandomPerson();

      send("message", person.name);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });
}

const serverSentEvent = (signal: any, setupStream: any) => {
  const stream = new ReadableStream({
    start(controller) {
      let encoder = new TextEncoder();

      function send(event: any, data: any) {
        controller.enqueue(encoder.encode(`event: ${event}\n`));
        controller.enqueue(encoder.encode(`data: ${data}\n\n`));
      }

      let setupCleanup = setupStream(send);

      let isControllerClosed = false;

      function closeStream() {
        if (isControllerClosed) return;
        setupCleanup();
        isControllerClosed = true;
        signal.removeEventListener("abort", closeStream);
        controller.close();
      }

      signal.addEventListener("abort", closeStream);

      if (signal.aborted) {
        return closeStream();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
};

const people = [
  {
    name: "Tim Berners-Lee",
    field: "Web",
    contribution:
      "Criação da World Wide Web (WWW) e desenvolvimento dos primeiros protocolos e padrões da web.",
  },
  {
    name: "Marc Andreessen",
    field: "Web",
    contribution:
      "Co-autor do primeiro navegador web popular, o Mosaic, e fundador da Netscape Communications Corporation.",
  },
  {
    name: "Brendan Eich",
    field: "Web",
    contribution: "Criador da linguagem de programação JavaScript.",
  },
  {
    name: "Sir David Baron",
    field: "Web",
    contribution:
      "Contribuições para o desenvolvimento de padrões CSS e co-fundador do Grupo de Trabalho CSS do W3C.",
  },
  {
    name: "Håkon Wium Lie",
    field: "Web",
    contribution:
      "Co-autor da especificação CSS e defensor do uso de padrões web.",
  },
  {
    name: "Jeffrey Zeldman",
    field: "Web",
    contribution:
      "Fundador do Web Standards Project e defensor dos padrões web e do design responsivo.",
  },
  {
    name: "Ian Hickson",
    field: "Web",
    contribution: "Editor das especificações HTML5 e WHATWG.",
  },
  {
    name: "Ethan Marcotte",
    field: "Web",
    contribution:
      "Cunhou o termo 'design responsivo' e contribuiu para o design web adaptável.",
  },
  {
    name: "Jennifer Robbins",
    field: "Web",
    contribution:
      "Autora do livro 'Web Design in a Nutshell' e defensora dos padrões web.",
  },
  {
    name: "Jordan Walke",
    field: "React",
    contribution: "Criador do ReactJS.",
  },
  {
    name: "Dan Abramov",
    field: "React",
    contribution:
      "Desenvolvedor do React e autor de bibliotecas populares como Redux e Create React App.",
  },
  {
    name: "Sophie Alpert",
    field: "React",
    contribution:
      "Engenheira de software do ReactJS no Facebook e co-autora do livro 'React Up and Running'.",
  },
  {
    name: "Andrew Clark",
    field: "React",
    contribution:
      "Engenheiro de software do ReactJS no Facebook e co-autor do livro 'React Up and Running'.",
  },
  {
    name: "Sebastian Markbåge",
    field: "React",
    contribution:
      "Contribuições significativas para a arquitetura interna do ReactJS e melhorias de performance.",
  },
  {
    name: "Tom Occhino",
    field: "React",
    contribution:
      "Engenheiro de software do ReactJS no Facebook e contribuidor ativo da comunidade.",
  },
  {
    name: "Pete Hunt",
    field: "React",
    contribution:
      "Co-autor do React Router, uma biblioteca popular para gerenciamento de rotas no React.",
  },
  {
    name: "Ryan Dahl",
    field: "Node",
    contribution: "Criador original do Node.js.",
  },
  {
    name: "Joyent",
    field: "Node",
    contribution:
      "Empresa que patrocinou o desenvolvimento inicial do Node.js e forneceu recursos para seu crescimento.",
  },
  {
    name: "Isaac Z. Schlueter",
    field: "Node",
    contribution:
      "Criador do gerenciador de pacotes npm, amplamente usado na comunidade Node.js.",
  },
  {
    name: "TJ Holowaychuk",
    field: "Node",
    contribution:
      "Autor de bibliotecas populares no ecossistema Node.js, como Express.js e Mocha.",
  },
  {
    name: "Bert Belder",
    field: "Node",
    contribution:
      "Contribuições para o desenvolvimento do Node.js, incluindo melhorias de desempenho e estabilidade.",
  },
  {
    name: "Mikeal Rogers",
    field: "Node",
    contribution:
      "Contribuições para o desenvolvimento do Node.js e organizador do NodeConf.",
  },
  {
    name: "Rod Vagg",
    field: "Node",
    contribution:
      "Contribuições para o desenvolvimento do Node.js, liderança do projeto Node.js LTS e defensor da comunidade Node.js.",
  },
];

function getRandomPerson() {
  const randomIndex = Math.floor(Math.random() * people.length);
  return people[randomIndex];
}
