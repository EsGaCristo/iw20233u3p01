import { Component } from '@angular/core';
import { Product } from '../models/product.model';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { AuthService } from '../services/auth.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  public products: Product[] = [];
  public productsFounds: Product[] = [];
  public filter = ['Abarrotes', 'Frutas y Verduras', 'Limpieza', 'Farmacia'];

  public colors = [
    {
      type: 'Abarrotes',
      color: 'primary',
    },
    {
      type: 'Frutas y Verduras',
      color: 'secondary',
    },
    {
      type: 'Limpieza',
      color: 'warning',
    },
    {
      type: 'Farmacia',
      color: 'danger',
    },
  ];

  constructor(
    private cartService: CartService,
    private router: Router,
    private alertController: AlertController,
    private productService: ProductService,
    private authService: AuthService,
    private toastController: ToastController
  ) {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
      this.productsFounds = this.products;
    });
  }

  public getColor(type: string): string {
    const itemFound = this.colors.find((element) => {
      return element.type === type;
    });
    let color = itemFound && itemFound.color ? itemFound.color : '';
    return color;
  }

  public filterProducts(): void {
    console.log(this.filter);
    this.productsFounds = this.products.filter((item) => {
      return this.filter.includes(item.type);
    });
  }

  async removeProduct(product: Product) {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Estás seguro de continuar?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {},
        },
        {
          text: 'Sí',
          handler: () => {
            this.productService
              .deleteProduct(product.id)
              .then(async (result) => {
                if (result === 'Success') {
                  const toast = await this.toastController.create({
                    message: 'Producto guardado correctamente',
                    duration: 2000, // Duración de 2 segundos
                    position: 'top', // Posición superior
                  });
                  toast.present();
                } else {
                  console.log('Error');
                }
              })
              .catch((error) => {
                console.log(error);
              });
          },
        },
      ],
    });

    await alert.present();
    //this.productsFounds = this.productService.getProducts();
  } //Funcion para eliminar un producto del menu

  updateProduct(index?: any) {
    localStorage.setItem('indexValue', index);
    this.router.navigate([`/add-product`]);
  } //Funcion para actualizar producto

  public addToCart(product: Product, i: number) {
    product.photo = product.photo + i;
    this.cartService.addToCart(product);
    console.log(this.cartService.getCart());
  }

  openProductAddPage() {
    this.router.navigate(['/add-product']); // Asume que la ruta 'product-add' existe para añadir productos.
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
