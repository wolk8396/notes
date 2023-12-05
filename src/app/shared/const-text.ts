import { CartButtonTextModule, ErrorModalErrorModule, MainKeyValueText } from "../modules/text.module"

const TextModalError:ErrorModalErrorModule  = {
  error: "the note should contain #",
  required:"field is required"
}

const TextButtonCart:CartButtonTextModule = {
  delete:'delete',
  update:'update cart'
}

const SearchInput:MainKeyValueText = {
  helperText: 'Please enter your tag',
  label:'Search your Tag'
}

const ButtonsText: MainKeyValueText = {
  btn_remove:'Clear all',
  btn_create:"Create Note",
}

const ModalText: MainKeyValueText = {
 btn_submit: 'Submit',
 title:'Your note',
 label: 'Please enter your Note'
}

const Result = 'No results found.'

export {TextModalError, TextButtonCart, Result, SearchInput, ButtonsText, ModalText}