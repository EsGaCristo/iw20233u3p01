import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.model';
import { map } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Observable<Product[]>;
  private favorites: Observable<Product[]>;


  private productCollection: AngularFirestoreCollection<Product>;
  private favoritCollection: AngularFirestoreCollection<Product>;

  constructor(private firestore: AngularFirestore) {
    this.productCollection = this.firestore.collection<Product>('products');
    this.favoritCollection = this.firestore.collection<Product>('favorites');
    this.products = this.productCollection.valueChanges({ idField: 'id' });
    this.favorites = this.productCollection.valueChanges({ idField: 'id' });
  }


  saveFavorites(product: Product): Promise<string> {
    return this.favoritCollection
      .add(product)
      .then((doc) => {
        return 'Success';
      })
      .catch((error) => {
        return 'error';
      });
  }
  saveProduct(product: Product): Promise<string> {
    return this.productCollection
      .add(product)
      .then((doc) => {
        return 'Success';
      })
      .catch((error) => {
        return 'error';
      });
  }
  deleteProduct(index?: string): Promise<String> {
    return this.productCollection
      .doc(index)
      .delete()
      .then(() => {
        return 'Success';
      })
      .catch((error) => {
        return 'error';
      });
  }
  updateProduct(
    updateProduct: Partial<Product>,
    index?: string
  ): Promise<String> {
    return this.productCollection
      .doc(index)
      .update(updateProduct)
      .then(() => {
        return 'Success';
      })
      .catch((error) => {
        console.error('Error al actualizar el producto', error);
        return 'Error';
      });
  }

  getProducts(): Observable<Product[]> {
    //return of(this.products);
    return this.products;
  }
  getFavorites(): Observable<Product[]> {
    //return of(this.products);
    return this.favorites;
  }
  getProductById(index: string): Observable<Product | undefined> {
    return this.products.pipe(
      map((products) => products.find((product) => product.id === index))
    );
  }
}
