import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Filiere } from '../interfaces/interface-model';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  //headers
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }


  // ******************************************************** GET ********************************************************
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

  // obtenir tous les modules
  getPersonnes():Observable<Filiere>{
    return this.http.get<Filiere>('')
  }

  // obtenir tous les modules
  getComptes():Observable<Filiere>{
    return this.http.get<Filiere>('')
  }

  // ******************************************************** CREATE ********************************************************

  // creer un filiere
  creerFiliere(data: any) : Observable<any>{
    return this.http.post<any>("", data, {headers: this.headers});
  }

  // creer une matiere
  creerMatiere(data: any) : Observable<any>{
    return this.http.post<any>("", data, {headers: this.headers});
  }

  // creer un module
  creerModule(data: any) : Observable<any>{
    return this.http.post<any>("", data, {headers: this.headers});
  }

  // creer un niveau
  creerNiveau(data: any) : Observable<any>{
    return this.http.post<any>("", data, {headers: this.headers});
  }

  //creer un personne
  creerPersonne(data: any) : Observable<any>{
    return this.http.post<any>("", data, {headers: this.headers});
  }

  //creer un personne
  creerCompte(data: any) : Observable<any>{
    return this.http.post<any>("", data, {headers: this.headers});
  }



  // ******************************************************** EDIT ********************************************************

  // editer un filiere
  editFiliere(id:number, data: any) : Observable<any>{
    return this.http.patch<any>(""+id, data, {headers: this.headers});
  }

  // editer une matiere
  editMatiere(id:number, data: any) : Observable<any>{
    return this.http.patch<any>(""+id, data, {headers: this.headers});
  }

  // editer un module
  editModule(id:number, data: any) : Observable<any>{
    return this.http.patch<any>(""+id, data, {headers: this.headers});
  }

  // editer un niveau
  editNiveau(id:number, data: any) : Observable<any>{
    return this.http.patch<any>(""+id, data, {headers: this.headers});
  }

  // editer un personne
  editPersonne(id:number, data: any) : Observable<any>{
    return this.http.patch<any>(""+id, data, {headers: this.headers});
  }

  // editer Compte
  editCompte(id:number, data: any) : Observable<any>{
    return this.http.patch<any>(""+id, data, {headers: this.headers});
  }

  // ******************************************************** DELETE ********************************************************

  // supprimer un filiere
  deleteFiliere(id:number) : Observable<any>{
    return this.http.delete<any>("");
  }

  // supprimer une matiere
  deleteMatiere(id:number) : Observable<any>{
    return this.http.delete<any>("");
  }

  // supprimer un module
  deleteModule(id:number) : Observable<any>{
    return this.http.delete<any>("");
  }

  // supprimer un niveau
  deleteNiveau(id:number) : Observable<any>{
    return this.http.delete<any>("");
  }

  // supprimer un personne
  deletePersonne(id:number) : Observable<any>{
    return this.http.delete<any>("");
  }

  // supprimer un compte
  deleteCompte(id:number) : Observable<any>{
    return this.http.delete<any>("");
  }

  /* ********************************************************************************************************************
     ************************************************* SPECIAL REQUESTS *************************************************
     ********************************************************************************************************************/

  /* Vérifier si une personne a un compte ou pas */
  haveAccount(id:number){
    return this.http.get<any>("", {headers: this.headers})
  }

  /* Réinitialiser le mot de passe d'un compte */
  resetPassword(id:number){

  }

}

// this.httpService.getFilieres().subscribe({
//   next: data => console.log(data),
//   error: e => console.log("error: " + e)
// })
