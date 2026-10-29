import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { ServiceArchivo } from '../../services/service.archivo';
import Archivo from '../../models/archivo';

@Component({
  selector: 'app-home-component',
  standalone: false,
  styleUrl: './home-component.css',
  templateUrl: './home-component.html',
})
export class HomeComponent {
  @ViewChild("cajafile") cajaFile!: ElementRef;
  public mensaje: string = "";

  constructor(
    private _service: ServiceArchivo,
    private _cdr: ChangeDetectorRef
  ) {}

  subirArchivo(): void {
    let fileInput = this.cajaFile.nativeElement;
    
    if (fileInput.files && fileInput.files.length > 0) {
      let file = fileInput.files[0];
      let fileName = file.name;
      
      let reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = async () => {
        let base64String = reader.result as string;
        
        let fileContent = base64String.split(',')[1];
        
        let archivo = new Archivo(fileName, fileContent);
        
        try {
          await this._service.uploadFileAsync(archivo);
          this.mensaje = "¡Archivo subido correctamente al servidor!";
        } catch (error) {
          this.mensaje = "Error al subir el archivo.";
          console.error(error);
        }
        
        this._cdr.detectChanges();
      };
    } else {
      this.mensaje = "Por favor, selecciona un archivo primero.";
    }
  }
}