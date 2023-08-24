import { AbstractControl, ValidationErrors } from "@angular/forms";

export class myValidator {
   static noSpaceValidation(control: AbstractControl) : ValidationErrors | null {
        let controlValue = control.value as string;
        if(controlValue.indexOf(` `) >=0) {
            return {noSpaceValidation: true}
        }
        else return null
    }

    // static noSymbolsVal(control: AbstractControl) : ValidationErrors | null {
    //     console.log(`hey`)
    //     let controlValue = control.value as string;
    //     if(controlValue.match(`[.]`)){
    //         return {noSpaceValidation: true}
    //     }
    //     else return null
    // }
}
