import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Product } from '../models/product.model';

@Component({
  selector: 'update-add-product',
  templateUrl: './update-product.page.html',
  styleUrls: ['./update-product.page.scss'],
})
export class UpdateProductPage implements OnInit {
  public productForm: FormGroup;
  private currentProduct: Product | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private toastController: ToastController,
    private router: Router
  ) {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: [''],
      photo: [''],
      type: ['', Validators.required],
    });
  }
  ngOnInit() {
    this.loadProductData();
  }

  async loadProductData() {
    const indexValue = localStorage.getItem('indexValue');
    if (indexValue) {
      this.productService.getProductById(indexValue).subscribe((product) => {
        if (product) {
          this.productForm.patchValue({
            name: product.name,
            price: product.price,
            description: product.description,
            photo: product.photo,
            type: product.type,
          });
        }
      });
    }
  }
  async updateProduct() {
    if (this.productForm.valid) {
      const product = this.productForm.value;
      this.productService
        .updateProduct(product, localStorage.getItem('indexValue')?.toString())
        .then(async (result) => {
          if (result === 'Success') {
            const toast = await this.toastController.create({
              message: 'Producto actualizado correctamente',
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
    } else {
      console.warn(
        'El formulario no es válido. Por favor, completa todos los campos requeridos.'
      );
    }
    // Redirigir a la pestaña tab1
    this.router.navigate(['/tabs/tab1']);
  }
}
