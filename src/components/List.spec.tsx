import { getByPlaceholderText, render, waitFor, waitForElementToBeRemoved, screen } from '@testing-library/react';
import  userEvent from '@testing-library/user-event';
import List from './List';


// test('sum', () => {
    //encontrar por texto
    // const { getByText } = render(<App />)

    //Quando não consegue encontrar o elemento que quer por nenhum atributo, então na tag do html pode jogar um texto
    //data-testid="textoQueDeseja"



    /*
    expect(getByText('Oi')).toBeInTheDocument()
    */
    //se tem uma classe específica
    // expect(getByText('Oi')).toHaveAttribute('class', 'test')

// })



describe('List Component', () => {

    //Test para encontrar um nome 
    it('should render list items', () => {
        //function rerender ele rerenderiza 
        const { getByText, rerender, queryByText, unmount  } = render(<List initialItems={['Suzy', 'Zoe', 'Belinha']} />)

        expect(getByText('Suzy')).toBeInTheDocument()
        expect(getByText('Zoe')).toBeInTheDocument()
        expect(getByText('Belinha')).toBeInTheDocument()

        unmount()
        rerender(<List initialItems={['Mimi']} />)
        expect(getByText('Mimi')).toBeInTheDocument()
        expect(queryByText('Suzy')).not.toBeInTheDocument()
    });

    //userEvent
    //Permite disparar ações dentro da interface da aplicação
    //Adicionando o debug ele mostra o código html
    //Para usar o find deve ser uma function async await
    it('should be able to add new item to the list', async () => {
        const { getByText, debug, getByPlaceholderText, findByText } = render(<List initialItems={[]} />)

        //buscando no html pelo placeholder
        const inputElement = getByPlaceholderText('Novo item');
        const addButton = getByText('Adicionar');

        debug()
        //digita o elemento
        userEvent.type(inputElement, 'Novo');
        userEvent.click(addButton);

        debug()

        // expect(getByText('Novo')).toBeInTheDocument();
        expect(await findByText('Novo')).toBeInTheDocument();

    });

    //teste de remover item da lista 
    it('should be able to add remove item from the list', async () => {
        const { getByText, getAllByText, getByPlaceholderText, queryByText } = render(<List initialItems={['Suzy']} />)

        const addButton1 = getByText('Adicionar');
        const removeButtons = getAllByText('Remover');

        userEvent.click(removeButtons[0]);

        await waitForElementToBeRemoved(() => {
            return getByText('Suzy')
        })
        //ou
        // await waitFor(() => {
        //     expect(queryByText('Novo')).not.toBeInTheDocument()
        // })
    })
});




