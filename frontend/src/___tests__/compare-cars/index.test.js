import CompareCars from "../../components/compare-cars/index";
import * as apis from '../../components/compare-cars/CompareCarsServices';
import { render, screen, act, within, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import configureAppStore from '../../store';
import { Provider } from 'react-redux';

describe('test compare cars compoenent', () => {
  it('test compare-cars rendering', async () => {
    jest.spyOn(apis, 'getCompareCarsDataApi').mockImplementationOnce(() => Promise.resolve([
      {
        "id": "Marutiefty878781899",
        "name": "Maruti Brezza",
        "compareData": {
          "Quick Compare": [
            {
              "Bootspace (litres)": 328
            },
            {
              "Mileage (ARAI) (kmpl)": "20.1"
            },
            {
              "Airbags": "2 Airbags (Driver, Front Passenger)"
            }
          ],
          "Specification": {
            "Engine & Transmission": {
              "Engine": "1462 cc, 4 Cylinders Inline, 4 Valves/Cylinder, DOHC",
              "Engine Type": "K15C Smart Hybrid",
              "Fuel Type": "Petrol",
              "Transmission": "Manual - 5 Gears"
            },
            "Dimensions & Weight": {
              "Length (mm)": 3995,
              "Width (mm)": 1790
            },
            "Suspensions, Brakes, Steering & Tyres": {
              "Front Suspension": "Mac Pherson Strut 5 coil",
              "Rear Suspension": "Torsion Beam & CoiL Spring",
              "Front Brake Type": "Ventilated Disc",
              "Rear Brake Type": "Drum",
              "Wheels": "Steel Rims",
              "Tyres": "215 / 60 R16"
            }
          },
          "Features": {
            "Safety": {
              "Overspeed Warning": "1 beep over 80kmph, Continuous beeps over 120kmph",
              "NCAP Rating": "Not Tested"
            }
          }
        }
      },
      {
        "id": "MarutiXL78189956656656",
        "name": "Maruti XL6",
        "compareData": {
          "Quick Compare": [
            {
              "Bootspace (litres)": 209
            },
            {
              "Mileage (ARAI) (kmpl)": "20.9"
            },
            {
              "Airbags": "4 Airbags (Driver, Front Passenger, Driver Side, Front Passenger Side)"
            }
          ],
          "Specification": {
            "Engine & Transmission": {
              "Engine": "1462 cc, 4 Cylinders Inline, 4 Valves/Cylinder, DOHC",
              "Engine Type": "K15B Smart Hybrid",
              "Fuel Type": "Petrol",
              "Transmission": "Manual - 5 Gears"
            },
            "Dimensions & Weight": {
              "Length (mm)": 4445,
              "Width (mm)": 1775
            },
            "Suspensions, Brakes, Steering & Tyres": {
              "Front Suspension": "MacPherson Strut & Coil Spring",
              "Rear Suspension": "Torsion Beam & CoiL Spring",
              "Front Brake Type": "Ventilated Disc",
              "Rear Brake Type": "Drum",
              "Wheels": "Alloy Wheels",
              "Tyres": "195 / 60 R16"
            }
          },
          "Features": {
            "Safety": {
              "Overspeed Warning": "1 beep over 80kmph, Continuous beeps over 120kmph",
              "NCAP Rating": "3 Star (Global NCAP)"
            }
          }
        }
      }
    ]))
    const store = configureAppStore({
      app: {
        data: [
          {
            "id": "Marutiefty878781899",
            "name": "Maruti Brezza",
            "price": "₹ 7.99 Lakh onwards",
            "image": "brezza.webp",
            "feedback": []
          },
          {
            "id": "MarutiXL78189956656656",
            "name": "Maruti XL6",
            "price": "₹ 11.29 Lakh",
            "image": "maruti-suzuki-xl6.webp",
            "feedback": []
          },
          {
            "id": "Hyundaicreta78189956656656",
            "name": "Hyundai Creta",
            "price": "₹ 10.44 Lakh onwards",
            "image": "creta.webp"
          },
          {
            "id": "TataHarrier8189956656656",
            "name": "Tata Harrier",
            "price": "₹ 14.69 Lakh onwards",
            "image": "harrier.webp"
          },
          {
            "id": "MahindraXUV700918995665665",
            "name": "Mahindra XUV700",
            "price": "₹ 13.18 Lakh onwards",
            "image": "mahindra-xuv700.webp"
          },
          {
            "id": "ToyotaVellfire918995665665",
            "name": "Toyota Vellfire",
            "price": "₹ 92.53 Lakh",
            "image": "toyota-vellfire.webp"
          },
          {
            "id": "KiaSeltosire91899566566532",
            "name": "Kia Seltos",
            "price": "₹ 10.49 Lakh onwards",
            "image": "kia-seltos.webp"
          },
          {
            "id": "MercedesBenzGClass66566532",
            "name": "Mercedes-Benz G-Class",
            "price": "₹ 1.72 Crore",
            "image": "MercedesBenz-GClass.webp"
          },
          {
            "id": "VolkswagenTiguanss66566532",
            "name": "Volkswagen Tiguan",
            "price": "₹ 32.79 Lakh",
            "image": "Volkswagen-Tiguan.webp"
          },
          {
            "id": "SkodaSlaviaanss68787887878",
            "name": "Skoda Slavia",
            "price": "₹ 10.99 Lakh onwards",
            "image": "skoda-slavia.webp"
          },
          {
            "id": "BMW878X1viaanss68787887878",
            "name": "BMW X1",
            "price": "₹ 41.45 Lakh",
            "image": "bmw-x1.webp"
          },
          {
            "id": "LandRoverDiscove6567887878",
            "name": "Land Rover Discovery Sport",
            "price": "₹ 71.39 Lakh",
            "image": "land-rover.webp"
          },
          {
            "id": "AudiQ3656788785867687767878",
            "name": "Audi Q3",
            "price": "₹ 44.89 Lakh",
            "image": "audi-q3.webp"
          },
          {
            "id": "VolvoXC9078878587778657878",
            "name": "Volvo XC90",
            "price": "₹ 93.90 Lakh",
            "image": "Volvo-XC90.webp"
          },
          {
            "id": "JaguarFPace8777434354546478",
            "name": "Jaguar F-Pace",
            "price": "₹ 74.88 Lakh",
            "image": "Jaguar-F-Pace.webp"
          },
          {
            "id": "RollsRoycePhantomVIII4354546478",
            "name": "Rolls-Royce Phantom VIII",
            "price": "₹ 9.50 Crore",
            "image": "RollsRoyce-Phantom-VIII-Exterior.webp"
          },
          {
            "id": "PorscheCayennemV89II4354546478",
            "name": "Porsche Cayenne",
            "price": "₹ 1.26 Crore",
            "image": "Porsche-Cayenne.webp",
            "feedback": [
              {
                "key": "2ef43267-11a8-493d-832d-06d1fa65255b",
                "title": "The Beast",
                "subtitle": "Its a great car to buy.",
                "name": "Pushkar Shrivastava",
                "email": "shrivastava.pus.hkar92@gmail.com"
              }
            ]
          },
          {
            "id": "NissanMagniteI4389998954546478",
            "name": "Nissan Magnite",
            "price": "₹ 5.97 Lakh onwards",
            "image": "Nissan-Magnite.webp"
          },
          {
            "id": "TataNexonEVMax89998954677546478",
            "name": "Tata Nexon EV Max",
            "price": "₹ 18.34 Lakh onwards",
            "image": "nexon-ev-max.webp",
            "feedback": [
              {
                "key": "ba7e3667-ce7f-449d-8566-b0dbede7af94",
                "title": "Great",
                "subtitle": "what a car it is!!!!",
                "name": "Pushkar Shrivastava",
                "email": "shrivastava.pushkar9898@gmail.com"
              }
            ]
          },
          {
            "id": "RenaultKiger8778835677546478",
            "name": "Renault Kiger",
            "price": "₹ 5.99 Lakh onwards",
            "image": "Renault-Kiger.webp"
          }
        ]
      },
      compare: {
        compareCarsData: {},
        dropdownDetails: [
          {
            key: '4b6a5fdc-b23f-4093-a89e-f7d9cf449054',
            name: '',
            value: '',
            itemId: null,
            data: {}
          },
          {
            key: '15d1e4c5-5ad9-47be-8a78-f59803d2b8b3',
            name: '',
            value: '',
            itemId: null,
            data: {}
          },
          {
            key: 'ca2b6baa-4abe-446a-9abc-4f05d271206a',
            name: '',
            value: '',
            itemId: null,
            data: {}
          },
          {
            key: '98bb5fb4-9a55-4741-8233-24ee040c20f5',
            name: '',
            value: '',
            itemId: null,
            data: {}
          },
          {
            key: '07f2afb8-55f7-4c70-9a5c-c5bf6c55dbd8',
            name: '',
            value: '',
            itemId: null,
            data: {}
          }
        ]
      }
    });

    render(<Provider store={store}><CompareCars /></Provider>, { wrapper: BrowserRouter });
    const btns = screen.getAllByTestId('DirectionsCarFilledTwoToneIcon');
    await act(async () => {
      userEvent.click(btns[0]);
    });
    const autocomplete = screen.getByTestId('autocomplete');
    const input = within(autocomplete).getByRole("combobox");

    autocomplete.click();
    autocomplete.focus();

    fireEvent.change(input, { target: { value: "Maruti Brezza" } });

    // to be sure, or do `findAllByRole` which is also async
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    fireEvent.click(screen.getAllByRole("option")[0]);

    await act(async () => {
      userEvent.click(btns[1]);
    });
    const autocomplete1 = screen.getByTestId('autocomplete');
    const input1 = within(autocomplete1).getByRole("combobox");

    autocomplete1.click();
    autocomplete1.focus();

    fireEvent.change(input1, { target: { value: "Maruti XL6" } });

    // to be sure, or do `findAllByRole` which is also async
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
      // fireEvent.click(screen.getAllByRole("option")[1]);
    });
    fireEvent.click(screen.getAllByRole("option")[0]);
    // const options = screen.getAllByRole("option");
    // console.log('----------', options);
    // await act(async () => fireEvent.click(screen.getAllByRole("option")[1]));

    const compareBtn = screen.getByRole('button', { name: 'Compare' });
    expect(compareBtn).toBeEnabled();

    await act(async () => {
      userEvent.click(btns[2]);
    });
    const autocomplete2 = screen.getByTestId('autocomplete');
    const input2 = within(autocomplete2).getByRole("combobox");

    autocomplete2.click();
    autocomplete2.focus();

    fireEvent.change(input2, { target: { value: "Maruti XL6" } });

    // to be sure, or do `findAllByRole` which is also async
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
      // fireEvent.click(screen.getAllByRole("option")[1]);
    });
    // console.log('++++++++=================================',autocomplete2);
    // const options = screen.getAllByRole("option");
    // console.log('----------', options);
    // console.log('+++++++++++++============', options);
    fireEvent.click(screen.getAllByRole("option")[0]);
    const toast = screen.getByText('This option is already selected...choose other option.');
    expect(toast).toBeInTheDocument();

    fireEvent.click(toast.parentElement.querySelector('[data-testid="CloseIcon"]'));

    fireEvent.click(compareBtn);

    fireEvent.click(screen.getAllByText('VS')[0].parentElement.querySelector('[data-testid="CloseIcon"]'));
    expect(compareBtn).toBeDisabled();

  })
})