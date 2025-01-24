import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Filiere } from '../interfaces/interface-model';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  // obtenir tous les filieres
  getFilieres():Observable<Filiere>{
    return this.http.get<Filiere>('')
  }

  // obtenir tous les niveaux
  getNiveaux():Observable<Filiere>{
    return this.http.get<Filiere>('')
  }

  // obtenir tous les matieres
  getMatieres():Observable<Filiere>{
    return this.http.get<Filiere>('')
  }

  // obtenir tous les modules
  getModules():Observable<Filiere>{
    return this.http.get<Filiere>('')
  }
}

// this.httpService.getFilieres().subscribe({
//   next: data => console.log(data),
//   error: e => console.log("error: " + e)
// })
