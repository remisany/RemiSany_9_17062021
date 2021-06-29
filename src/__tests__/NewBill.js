import { screen } from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"

import { localStorageMock } from "../__mocks__/localStorage.js";
import userEvent from '@testing-library/user-event'
import { ROUTES } from "../constants/routes"
import { fireEvent } from "@testing-library/dom"

describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page and I submit the form width an image with the correct format (jpg, jpeg, png)", () => {
    test("Then a new bill should be create", () => {
      const html = NewBillUI();
      document.body.innerHTML = html;
   
      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname })
      }

      screen.getByTestId("expense-type").value = "Restaurants et bars"
      screen.getByTestId("expense-name").value = "Afterwork"
      screen.getByTestId("amount").value = "100"
      screen.getByTestId("datepicker").value = "2021-05-24"
      screen.getByTestId("vat").value = "70"
      screen.getByTestId("pct").value = "20"
      screen.getByTestId("commentary").value = "Cohésion d'équipe"
      //screen.getByTestId("file").file = [new File(["image.jpg"], "image.jpg", { type: "image/jpeg" })]

      const newBill = new NewBill({ document, onNavigate, firestore: null, localStorage: window.localStorage })

      const file = screen.getByTestId("file")
      const handleChangeFile = jest.fn(newBill.handleChangeFile)
      file.addEventListener("change", handleChangeFile);
      fireEvent.change(file, { target: { file: [new File(["image.jpg"], "image.jpg", { type: "image/jpeg" })] } })
      expect(handleChangeFile).toHaveBeenCalled()

      /*
      const form = screen.getByTestId("form-new-bill")
      const handleSubmit = jest.fn(newBill.handleSubmit)
      form.addEventListener("submit", handleSubmit)
      fireEvent.submit(form)
      expect(handleSubmit).toHaveBeenCalled()
      //expect(screen.getAllByText('Mes notes de frais')).toBeTruthy()*/
    })
  })

  describe("When I am on NewBill Page and I submit the form width an image with the incorrect format (pdf)", () => {
    test("Then a new bill should be create", () => {
      /*const html = NewBillUI();
      document.body.innerHTML = html;
   
      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname })
      }

      const billSampleIncorrect = {
        type: "Hôtel et logement",
        name: "Séminaire",
        amount: "100",
        date: "2021-05-24",
        vat: "70",
        pct: "20",
        commentary: "Cohésion d'équipe",
        file: [new File(["document.pdf"], "document.pdf", { type: "application/pdf" })]
      }

      screen.getByTestId("expense-type").value = billSampleIncorrect.type
      screen.getByTestId("expense-name").value = billSampleIncorrect.name
      screen.getByTestId("amount").value = billSampleIncorrect.amount
      screen.getByTestId("datepicker").value = billSampleIncorrect.date
      screen.getByTestId("vat").value = billSampleIncorrect.vat
      screen.getByTestId("pct").value = billSampleIncorrect.pct
      screen.getByTestId("commentary").value = billSampleIncorrect.commentary
      screen.getByTestId("file").file = billSampleIncorrect.file

      const newBill = new NewBill({ document, onNavigate, firestore: null, localStorage: window.localStorage })

      const file = screen.getByTestId("file")
      const handleChangeFile = jest.fn(newBill.handleChangeFile)
      file.addEventListener("change", handleChangeFile);
      fireEvent.change(file);
      expect(handleChangeFile).toHaveBeenCalled()

      /*
      const form = screen.getByTestId("form-new-bill")
      const handleSubmit = jest.fn(newBill.handleSubmit)
      form.addEventListener("submit", handleSubmit)
      fireEvent.submit(form)
      expect(handleSubmit).toHaveBeenCalled()
      */
    })
  })
})