$(document).ready(function() {
    $('#cep').mask('00000-000')

    $('#btn-buscar-cep').click(function() {
        const cep = $('#cep').val();
        const endpoint = `https://viacep.com.br/ws/${cep}/json`;
        const botao = $(this);

        $(botao).find('i').addClass('d-none');
        $(botao).find('span').removeClass('d-none');

        fetch(endpoint).then(function(resposta) {
            return resposta.json()
        })
        .then(function(json){
            const logradouro = json.logradouro;
            const bairro = json.bairro;
            const cidade = json.localidade;
            const estado = json.uf;
            $('#endereco').val(logradouro)
            $('#bairro').val(bairro)
            $('#localidade').val(cidade)
            $('#uf').val(estado)

            $(botao).find('i').removeClass('d-none');
            $(botao).find('span').addClass('d-none');
        })
    })
})
