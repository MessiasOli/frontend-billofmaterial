import axios, { AxiosInstance }  from "axios"
import { IRepository } from './interface/IRepository';
import { Injectable } from '@angular/core';
import { Material } from '../model/material';
import { Process } from '../model/process';

export var URL_API:string = "https://b-bom-ra-sc3009572.herokuapp.com/api"
//export var URL_API = "http://localhost:8080/api"
@Injectable({
  providedIn: 'root'
})
export class DbMongooseService implements IRepository {
  processList: Process[] = []
  api: AxiosInstance

  constructor() {
    this.api = axios.create({
      url: "https://f-bom-ra-sc3009572.herokuapp.com/",
      baseURL: "https://b-bom-ra-sc3009572.herokuapp.com/",
      headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      }
    })

    this.processList = [
      {
        id : "1",
        process: "Processo 1",
        unitmensurement: "kg",
        value: 15.55
      },
      {
        id : "2",
        process: "Processo 2",
        unitmensurement: "kg",
        value: 100
      },
    ]
   }

  async AddMaterial(mat: Material):Promise<boolean> {
    await this.api.post(`/material`, mat)
      .then(res => res.data).then(data => {
        console.log('data :>> ', data);
      })
      .catch(err => {
        console.log(err)
        return false
      }
      )

      return true
  }

  async GetAllMaterials(id: string): Promise<Material[]> {
    let listMat :Material[] = []
    await this.api.get(`/material`)
      .then(res => res.data).then(data => {
        console.log('daata :>> ', data);
        listMat = data;
      })
      .catch(console.log)
    return listMat.filter(mat => mat.idprocess == id);
  }

  GetMaterial(id: string): Material {
    throw new Error('Method not implemented.');
  }

  async DeleteMaterials(id: string, idProcess: string): Promise<void> {
    await this.api.delete(`/material/${id}/${idProcess}`)
    .then(res => res.data).then(data => {
      console.log('data :>> ', data);
    })
    .catch(err => {
      console.log(err)
    }
    )
  }

  async UpdateMaterials(mat: Material): Promise<Material> {
    let matForUpdate: Material = new Material () 
    
    matForUpdate.idmaterial = mat.idmaterial;
    matForUpdate.idprocess = mat.idprocess;
    matForUpdate.description = mat.description;
    matForUpdate.price = mat.price;
    matForUpdate.specificvalue = mat.specificvalue;
    matForUpdate.unitmensurement = mat.unitmensurement;

    console.log('mat :>> ', matForUpdate);
    await this.api.put(`/material`, matForUpdate)
      .then(res => {console.log(res); return res.data}).then(data => {
        console.log('daata :>> ', data);
      })
      .catch(console.log)
    return matForUpdate
  }

  AddProcess(process: Process): boolean {
    throw new Error('Method not implemented.');
  }
  GetAllProcess(): Process[] {
    return this.processList;
  }
  GetProcess(id: string): Process {
    throw new Error('Method not implemented.');
  }
  DeleteProcess(id: string): void {
    throw new Error('Method not implemented.');
  }
  UpdateProcess(process: Process): Process {
    throw new Error('Method not implemented.');
  }
}
