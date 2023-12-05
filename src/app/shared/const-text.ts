import { CartButtonTextModule, ErrorModalErrorModule } from "../modules/text.module"

const TextModalError:ErrorModalErrorModule  = {
  error: "the note should contain #",
  required:"field is required"
}

const TextButtonCart:CartButtonTextModule = {
  delete:'delete',
  update:'update cart'
}

export {TextModalError, TextButtonCart}