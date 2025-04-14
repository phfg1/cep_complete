document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('btn-buscar-cep').addEventListener('click', function() {

        const xhttp = new XMLHttpRequest();

        let cepInput = document.getElementById('cep');
        let cep = cepInput.value.replace(/\D/g, '');

        if (cep.length !== 8) {
            alert('Digite um CEP válido');
            cepInput.value = '';
            return;
        }

        const endpoint = `https://viacep.com.br/ws/${cep}/json`;

        const iconSearch = this.querySelector('.bi-search');
        const spinner = this.querySelector('.spinner-border');

        iconSearch.classList.add('d-none');
        spinner.classList.remove('d-none');

        xhttp.open('GET', endpoint);
        xhttp.send();

        xhttp.onload = function() {

            iconSearch.classList.remove('d-none');
            spinner.classList.add('d-none');


            if (xhttp.status === 200) {
                const data = JSON.parse(xhttp.responseText);

                if (!data.erro) {                    
                    document.getElementById('endereco').value = data.logradouro;
                    document.getElementById('bairro').value = data.bairro;
                    document.getElementById('localidade').value = data.localidade;
                    document.getElementById('uf').value = data.uf;
                } else {
                    document.getElementById('endereco').value = 'CEP não encontrado';
                }
            } else {
                console.error('Erro na requisição:', xhttp.status);
                document.getElementById('endereco').value = "Erro ao buscar endereço"
            }
        }
    })
})




