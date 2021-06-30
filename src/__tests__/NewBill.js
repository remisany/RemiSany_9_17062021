import { screen } from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"
import { localStorageMock } from "../__mocks__/localStorage.js"
import { ROUTES } from "../constants/routes"
import { fireEvent } from "@testing-library/dom"

describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page and I add a file", () => {
    test("Then a new file should be change in the input file", () => {
      const html = NewBillUI()
      document.body.innerHTML = html
      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname })
      }
      const newBill = new NewBill({ document, onNavigate, localStorage: window.localStorage })
      const file = screen.getByTestId("file")
      const handleChangeFile = jest.fn(newBill.handleChangeFile)
      file.addEventListener("change", handleChangeFile)
      fireEvent.change(file, { target: { files: [new File(["image.jpg"], "image.jpg", { type: "image/jpeg" })] } })
      expect(handleChangeFile).toHaveBeenCalled();
      expect(file.files[0].name).toBe("image.jpg")
    })
  })

  describe("When I am on NewBill Page and I submit the form width an image with the correct format (jpg, jpeg, png)", () => {
    test("Then a new bill should be create", () => {
      const html = NewBillUI()
      document.body.innerHTML = html
      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname })
      }
      const newBill = new NewBill({ document, onNavigate, firestore: null, localStorage: window.localStorage })
      const form = screen.getByTestId("form-new-bill")
      const handleSubmit = jest.fn(newBill.handleSubmit)
      form.addEventListener("submit", handleSubmit)
      fireEvent.submit(form)
      expect(handleSubmit).toHaveBeenCalled()
    })
    test("Then it should render Bills page", () => {
      expect(screen.getByText('Mes notes de frais')).toBeTruthy()
    })
  })

  describe("When I am on NewBill Page and I submit the form width an image with the incorrect format (pdf)", () => {
    test("Then a new bill shouldn't be create and I stay on the NewBill page", () => {
      const html = NewBillUI()
      document.body.innerHTML = html
      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname })
      }
      const newBill = new NewBill({ document, onNavigate, localStorage: window.localStorage })
      newBill.fileName = "invalid";
      const form = screen.getByTestId("form-new-bill")
      const handleSubmit = jest.fn(newBill.handleSubmit)
      form.addEventListener("submit", handleSubmit)
      fireEvent.submit(form)
      expect(handleSubmit).toHaveBeenCalled()
      expect(handleSubmit).toBeFalsy;
    })
    test("Then it should render NewBill page", () => {
      expect(screen.getAllByText("Envoyer une note de frais")).toBeTruthy()
    })
  })
})