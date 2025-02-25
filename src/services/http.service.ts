import { saveAs } from 'file-saver';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseUrl: string = "http://localhost:8080/";
  token: string | null = localStorage.getItem('accestoken');
  authHeader: HttpHeaders;
  updateHeader: HttpHeaders;

  //headers
  headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private http: HttpClient) {
    this.authHeader = new HttpHeaders().set("Authorization", `Bearer ${this.token}`);
    this.updateHeader = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set("Authorization", `Bearer ${this.token}`);
  }


  // ******************************************************** GET ********************************************************
  // obtenir tous les filieres
  getFilieres():Observable<any>{
    return this.http.get<any>(this.baseUrl+"filieres", {headers: this.authHeader})
  }

  // obtenir tous les niveaux
  getNiveaux():Observable<any>{
    return this.http.get<any>(this.baseUrl+"niveaux", {headers: this.authHeader})
  }

  // obtenir tous les matieres
  getMatieres():Observable<any>{
    return this.http.get<any>(this.baseUrl+"matieres", {headers: this.authHeader})
  }

  // obtenir tous les modules
  getModules():Observable<any>{
    return this.http.get<any>(this.baseUrl+"modules", {headers: this.authHeader})
  }

  // obtenir tous les modules
  getModule(id:number):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}modules/${id}`, {headers: this.authHeader})
  }

  // obtenir tous les personnes
  getPersonnes():Observable<any>{
    return this.http.get<any>(this.baseUrl+"personnes", {headers: this.authHeader})
  }

  // obtenir tous les users
  getComptes():Observable<any>{
    return this.http.get<any>(this.baseUrl+"users", {headers: this.authHeader})
  }

  // obtenir tous les enseignants
  getEnseignants():Observable<any>{
    return this.http.get<any>(this.baseUrl+"enseignants", {headers: this.authHeader})
  }

  // obtenir tous les semestres
  getSemestres():Observable<any>{
    return this.http.get<any>(this.baseUrl+"semestres", {headers: this.authHeader})
  }

  // obtenir tous les enseignants
  getEtudiants():Observable<any>{
    return this.http.get<any>(this.baseUrl+"etudiants", {headers: this.authHeader})
  }


  // ******************************************************** CREATE ********************************************************

  // creer un filiere
  creerFiliere(data: any, id_cord:number) : Observable<any>{
    return this.http.post<any>(`${this.baseUrl}filieres?id_coordinateur=${id_cord}`, data, {headers: this.updateHeader});
  }

  // creer une matiere
  creerMatiere(data: any, id_module: number,id_ensignant: number ) : Observable<any>{
    return this.http.post<any>(this.baseUrl+`matieres?id_module=${id_module}&id_ensignant=${id_ensignant}`, data, {headers: this.updateHeader});
  }

  // creer un module
  creerModule(data: any, id_niveau:number, id_resp:number) : Observable<any>{
    return this.http.post<any>(this.baseUrl+`modules?id_niveau=${id_niveau}&id_resp=${id_resp}`, data, {headers: this.updateHeader});
  }

  // creer un niveau
  creerNiveau(data: any, filiere_id:number, id_niveau_suivant?:number) : Observable<any>{
    let url = `${this.baseUrl}niveaux?filiere_id=${filiere_id}`;

    if (id_niveau_suivant !== undefined) {
        url += `&id_niveau_suivant=${id_niveau_suivant}`;
    }

    return this.http.post<any>(url, data, {headers: this.updateHeader});
  }

  //creer un personne
  creerPersonne(data: any) : Observable<any>{
    return this.http.post<any>(this.baseUrl+"personnes", data, {headers: this.updateHeader});
  }

  //creer un utilisateur
  creerCompte(data: any, id_personne:number) : Observable<any>{
    return this.http.post<any>(this.baseUrl+`users?id_personne=${id_personne}`, data, {headers: this.updateHeader});
  }

  //creer un enesignant
  creerEnseignant(data: any) : Observable<any>{
    return this.http.post<any>(this.baseUrl+"enseignants", data, {headers: this.updateHeader});
  }

  //creer un semester
  creerSemestres(data: any) : Observable<any>{
    return this.http.post<any>(this.baseUrl+"semestres", data, {headers: this.updateHeader});
  }

  creerEtudiant(data: any) : Observable<any>{
    return this.http.post<any>(this.baseUrl+"etudiants", data, {headers: this.updateHeader});
  }



  // ******************************************************** EDIT ********************************************************

  // editer un filiere
  editFiliere(id:number, data: any) : Observable<any>{
    return this.http.put<any>(this.baseUrl+`filieres/${id}`, data, {headers: this.updateHeader});
  }

  // editer une matiere
  editMatiere(id:number, data: any) : Observable<any>{
    // return this.http.put<any>(""+id, data, {headers: this.headers});
    return this.http.put<any>(this.baseUrl+`matieres/${id}`, data, {headers: this.updateHeader});
  }

  // editer un module
  editModule(id:number, data: any) : Observable<any>{
    return this.http.put<any>(this.baseUrl+`modules/${id}`, data, {headers: this.updateHeader});
  }

  // editer un niveau
  editNiveau(id:number, data: any, id_niveau_suivant?:number) : Observable<any>{
    return this.http.put<any>(this.baseUrl+`niveaux/${id}?id_niveau_suivant=${id_niveau_suivant}`, data, {headers: this.updateHeader});
  }

  // editer un personne
  editPersonne(id:number, data: any) : Observable<any>{
    return this.http.put<any>(this.baseUrl+`personnes/${id}`, data, {headers: this.updateHeader});
  }

  // editer Compte
  editCompte(id:number, data: any) : Observable<any>{
    return this.http.put<any>(this.baseUrl+`users/${id}`, data, {headers: this.updateHeader});
  }

  // editer enseignant
  editEnseignant(id:number, data: any) : Observable<any>{
    return this.http.put<any>(this.baseUrl+`enseignants/${id}`, data, {headers: this.updateHeader});
  }

  // editer semester
  editSemestres(id:number, data: any) : Observable<any>{
    return this.http.put<any>(this.baseUrl+`semestres/${id}`, data,{headers: this.updateHeader});
  }

  // editer etudiant
  editEtudiant(id:number, data: any) : Observable<any>{
    return this.http.put<any>(this.baseUrl+`etudiants/${id}`, data, {headers: this.updateHeader});
  }

  // ******************************************************** DELETE ********************************************************

  // supprimer un filiere
  deleteFiliere(id:number) : Observable<any>{
    return this.http.delete<any>(this.baseUrl+`filieres/${id}`, {headers:this.authHeader});
  }

  // supprimer une matiere
  deleteMatiere(id:number) : Observable<any>{
    return this.http.delete<any>(this.baseUrl+`matieres/${id}`, {headers:this.authHeader});
  }

  // supprimer un module
  deleteModule(id:number) : Observable<any>{
    return this.http.delete<any>(this.baseUrl+`modules/${id}`, {headers:this.authHeader});
  }

  // supprimer un niveau
  deleteNiveau(id:number) : Observable<any>{
    return this.http.delete<any>(this.baseUrl+`niveaux/${id}`, {headers:this.authHeader});
  }

  // supprimer un personne
  deletePersonne(id:number) : Observable<any>{
    return this.http.delete<any>(this.baseUrl+`personnes/${id}`, {headers:this.authHeader});
  }

  // supprimer un compte
  deleteCompte(id:number) : Observable<any>{
    return this.http.delete<any>(this.baseUrl+`users/${id}`, {headers:this.authHeader});
  }

  // supprimer un enseignant
  deleteEnseignant(id:number) : Observable<any>{
    return this.http.delete<any>(this.baseUrl+`enseignants/${id}`, {headers:this.authHeader});
  }

  // supprimer un semester
  deleteSemestre(id:number) : Observable<any>{
    return this.http.delete<any>(this.baseUrl+`semestres/${id}`, {headers:this.authHeader});
  }

  deleteEtudiant(id:number) : Observable<any>{
    return this.http.delete<any>(this.baseUrl+`etudiants/${id}`, {headers:this.authHeader});
  }

  /* ********************************************************************************************************************
     ************************************************* SPECIAL REQUESTS *************************************************
     ********************************************************************************************************************/

  /* Vérifier si une personne a un compte ou pas */
  haveAccount(id:number):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}personnes/hasAccount?id=${id}` , {headers: this.authHeader});
  }

  /* Réinitialiser le mot de passe d'un compte */
  resetPassword() : Observable<any>{
    return this.http.get<any>(`${this.baseUrl}` , {headers: this.headers});
  }

  /* export collect marks file */
  exportCollectNotesParModule(id_semester:number, id_niveau:number, id_module:number) {
    this.http.get(`${this.baseUrl}excel/download/collectnotes?id_semester=${id_semester}&id_niveau=${id_niveau}&id_module=${id_module}`, { responseType: 'blob', headers:this.authHeader }, ).subscribe({
      next: (data: Blob) => saveAs(data),
      error: err => console.error('Error downloading Excel file:', err)
    });
  }

  /* export collect marks file */
  importCollectNotesParModule(file: File) : Observable<any>{
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(this.baseUrl+"excel/upload/collectnotes",formData)
  }

  /* export collect marks file */
  exportDeliCollectNotes(id_niveau:number){
    this.http.get(`${this.baseUrl}excel/download/delinotes?id_niveau=${id_niveau}`, { responseType: 'blob', headers:this.authHeader }).subscribe({
      next: (res:Blob) => saveAs(res),
      error: err => console.error('Error downloading Excel file:', err)
    }
    );
  }

  importDeliNotes(file: File) : Observable<any>{
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(this.baseUrl+"excel/upload/delinotes",formData);
  }

  import_sp(file: File) : Observable<any>{
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(this.baseUrl+"excel/upload/sp",formData);
  }

  import_inscription(file: File) : Observable<any>{
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(this.baseUrl+"inscriptions/import",formData);
  }
  // // obtenir modules by niveau id
  // getModulesByNiveauId(id:number):Observable<any>{
  //   return this.http.get<any>(`${this.baseUrl}+modules?id_niveau=${id}`)
  // }

  // obtenir etudiant by cne
  getEtudaintByCne(cne:String):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}etudiants/bycne?cne=${cne}`, {headers:this.authHeader})
  }

  //get Note By Etudiant Id And Module Id And Anne Etude
  getNoteByEtudiantIdAndModuleIdAndAnneEtude(cne:string, id_module:number, anneEtude:string){
    return this.http.get<any>(`${this.baseUrl}notesetudiant/singlenote?cne=${cne}&id_module=${id_module}&anneEtude=${anneEtude}`, {headers:this.authHeader})
  }

}

