$(function() {

    const categorias =  $("input[name='categorias']");
    const formulario = $("form");
    const entradaCategoriasContenido = $("#input-categorias").parent();


    formulario.click(function(evento) {
        if (evento.target.classList.contains("category-remove")) {
            $(evento.target).parent().remove();
            
            const array = [];
            for (var nodo of $(".category")) {
                array.push($(nodo).attr("text"));
            }
            categorias.val(array.join(", "));

        }
    });

    formulario.keypress(function(evento) {
        if (evento.target.id === "input-categorias") {
            if (evento.charCode === 13) {
                const entrada = evento.target.value.trim();
                if (entrada && entrada.length >= 2 && $("*[category='" + entrada.toLowerCase() + "']").length == 0) {
                    
                    entradaCategoriasContenido.html(entradaCategoriasContenido.html() + " <span class='category' text='" + entrada + "' category='" + entrada.toLowerCase() + "'>" + entrada + " <button type='button' class='category-remove'>X</button></span>");
                    evento.target.value = '';
                    
                    const array = [];
                    for (var nodo of $(".category")) {
                        array.push($(nodo).attr("text"));
                    }
                    categorias.val(array.join(", "));

                }
                evento.preventDefault();
            }
            
        }
    });

});