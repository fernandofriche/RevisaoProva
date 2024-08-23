import {useEffect, useState} from "react";

export default function ConverterMedida() {
    const [medidas, setMedidas] = useState({});
    const [valor, setValor] = useState('');
    const [unidadeDeConversao, setUnidadeDeConversao] = useState('quilometros');
    const [resultado, setResultado] = useState(null);

    useEffect(() => {
        fetch('./comprimentos.json')
            .then(resposta => resposta.json())
            .then(dados => setMedidas(dados.metros))
            .catch(erro => console.error("Erro ao tentar carregar as convercoes de medidas: ", erro))
    }, []);

    const fazerConversao = () => {
        const medidaConversao = medidas[unidadeDeConversao];
        if (medidaConversao) {
            setResultado(valor * medidaConversao);
        }
    };
    return (
        <>
            <h1>Conversão</h1>
            <input
                type="number"
                value={valor}
                onChange={e => setValor(e.target.value)}
                placeholder="Valor em metros"
            />
            <span>Para</span>
            <select value={unidadeDeConversao} onChange={e => setUnidadeDeConversao(e.target.value)}>
                {Object.keys(medidas).map(unidade => (
                    <option key={unidade} value={unidade}>{unidade}</option>
                ))}
            </select>
            <button onClick={fazerConversao}>Converter</button>
            {resultado !== null && <p>Resultado: {resultado.toFixed(2)} {unidadeDeConversao}</p>}

        </>
    )
}

/* JEITO QUE EU ENTENDO:
import {useEffect, useState} from "react";

// Função principal do componente ConverterMedida, que será exportado e utilizado em outros lugares.
export default function ConverterMedida() {
    // Definição dos estados do componente usando o useState.
    const [medidas, setMedidas] = useState({}); // Armazena as taxas de conversão carregadas do arquivo JSON.
    const [valor, setValor] = useState(''); // Armazena o valor em metros que o usuário deseja converter.
    const [unidadeDeConversao, setUnidadeDeConversao] = useState('quilometros'); // Armazena a unidade de medida selecionada para a conversão.
    const [resultado, setResultado] = useState(null); // Armazena o resultado da conversão.

    // useEffect para carregar as medidas de conversão quando o componente é montado.
    useEffect(() => {
        // Função assíncrona que lida com a requisição e carregamento dos dados do JSON.
        const carregarMedidas = async () => {
            try {
                // Faz a requisição ao arquivo JSON contendo as taxas de conversão.
                const resposta = await fetch('./comprimentos.json');
                
                // Converte a resposta para um objeto JavaScript.
                const dados = await resposta.json();
                
                // Atualiza o estado 'medidas' com as taxas de conversão obtidas (dados.metros).
                setMedidas(dados.metros);
            } catch (erro) {
                // Caso ocorra um erro durante a requisição ou a conversão para JSON, exibe o erro no console.
                console.error("Erro ao tentar carregar as conversões de medidas: ", erro);
            }
        };

        // Chama a função assíncrona para carregar as medidas de conversão.
        carregarMedidas();
    }, []); // O array vazio [] garante que esse efeito só seja executado uma vez, quando o componente é montado.

    // Função que realiza a conversão com base no valor em metros e na unidade selecionada.
    const fazerConversao = () => {
        // Obtém a taxa de conversão para a unidade selecionada.
        const medidaConversao = medidas[unidadeDeConversao];
        
        // Se a taxa de conversão existir, calcula o resultado e atualiza o estado 'resultado'.
        if (medidaConversao) {
            setResultado(valor * medidaConversao);
        }
    };

    // Renderiza o JSX (interface do componente).
    return (
        <>
            <h1>Conversão</h1>
            
            {/* Campo de entrada para o usuário digitar o valor em metros a ser convertido */}
           /* <input
                type="number" // O input aceita apenas números.
                value={valor} // O valor do input está vinculado ao estado 'valor'.
                onChange={e => setValor(e.target.value)} // Atualiza o estado 'valor' sempre que o usuário digitar algo.
                placeholder="Valor em metros" // Texto exibido quando o campo está vazio.
            />

            <span>Para</span>

            {/* Menu suspenso para o usuário selecionar a unidade de medida para a conversão */}
            /*<select value={unidadeDeConversao} onChange={e => setUnidadeDeConversao(e.target.value)}>
                {/* Gera as opções do select dinamicamente com base nas chaves do objeto 'medidas' */}
               /* {Object.keys(medidas).map(unidade => (
                    <option key={unidade} value={unidade}>{unidade}</option> // Cada opção representa uma unidade de medida.
                ))}
            </select>

            {/* Botão que, quando clicado, chama a função para fazer a conversão */}
           /* <button onClick={fazerConversao}>Converter</button>

            {/* Exibe o resultado da conversão, se houver um resultado calculado */}
           /* {resultado !== null && <p>Resultado: {resultado.toFixed(2)} {unidadeDeConversao}</p>}
        </>
    );
            }
