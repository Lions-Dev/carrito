const botonesAddToCart = document.querySelectorAll('.addToCart');
const CarritoContenedor = document.querySelector('.CarritoContenedor')

botonesAddToCart.forEach(botonAddToCart =>{
     botonAddToCart.addEventListener('click', AñadirConClick)
});

const botonComprar = document.querySelector('.comprarButton').addEventListener('click',comprar)

function AñadirConClick(event){
const boton = event.target;
const item= boton.closest('.item')
const titulo = item.querySelector('.item-title').textContent;
const precio = item.querySelector('.item-price').textContent;
const imagen = item.querySelector('.item-image').src;
AñadirAlCarrito(titulo, precio, imagen)
}

function AñadirAlCarrito(titulo, precio, imagen){

    //No duplicar valores
    const elementoTitulo = CarritoContenedor.getElementsByClassName('shopTitulo');
    for (let i = 0; i < elementoTitulo.length; i++){
        if(elementoTitulo[i].innerText == titulo){
           let elementoCantidad =  CarritoContenedor.querySelector('.shopCantidad')
           elementoCantidad.value++
           ActualizarTotal();
           return;
        }
    }

    const Compras = document.createElement('div')
    const ContenidoCompras =
    `<div class="shopping-cart-items CarritoContenedor">
        <div class="row shopItems">
            <div class="col-6">
                <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                    <img src='${imagen}' class="shopping-cart-image">
                    <h6 class="shopping-cart-item-title shopTitulo text-truncate ml-3 mb-0">${titulo}
                    </h6>
                </div>
            </div>
            <div class="col-2">
                <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                    <p class="item-price mb-0 shopPrecio">${precio}</p>
                </div>
            </div>
            <div class="col-4">
                <div
                    class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                    <input class="shopping-cart-quantity-input shopCantidad" type="number"
                        value="1">
                    <button class="btn btn-danger buttonDelete" type="button">X</button>
                </div>
            </div>
        </div>
      
    </div>`;

    Compras.innerHTML = ContenidoCompras
    CarritoContenedor.append(Compras)

    Compras.querySelector('.buttonDelete').addEventListener('click', borrarItem)
    Compras.querySelector('.shopCantidad').addEventListener('change', CambiarshopCantidad)

    ActualizarTotal();
    
    
}
    //ACTUALIZAR TOTAL
    function ActualizarTotal(){
    let total = 0;
    const ObtenerTotal = document.querySelector('.total')
    const ShoppingItems = document.querySelectorAll('.shopItems')
    ShoppingItems.forEach(ShoppingItem => {
        const ShoppingItemPrecio = ShoppingItem.querySelector('.shopPrecio');
        const PrecioParceado = Number(ShoppingItemPrecio.textContent.replace('$', ''));
        const CantidadItems =  ShoppingItem.querySelector('.shopCantidad')
        const CantidadItemsValor = Number(CantidadItems.value)
        total = total + PrecioParceado * CantidadItemsValor
        })
    ObtenerTotal.innerHTML = `$${total.toFixed(2)}`;    
    }

    //BORRAR ITEM
    function borrarItem(event){
        const botonBorrar = event.target;
        botonBorrar.closest('.shopItems').remove();
        ActualizarTotal();
    }

    //CAMABIAR CANTIDAD DE ITEMS
    function CambiarshopCantidad(event){
        const input = event.target
        if(input.value <= 0){
            input.value = 1;
        }
        ActualizarTotal();
    }

    //Comprar 
    function comprar(){
        CarritoContenedor.innerHTML = ''
        ActualizarTotal();
    }