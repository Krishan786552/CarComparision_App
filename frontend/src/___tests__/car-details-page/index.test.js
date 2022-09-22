import CarDetailsPage from '../../components/car-details-page/index';
import { render, screen, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import configureAppStore from '../../store';
import { Provider } from 'react-redux';
import * as apis from '../../components/car-details-page/CarDetailsServices';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useLocation: () => ({
    state: {
      id: 'Marutiefty878781899'
    }
    //   teamId: 'team-id1',
  }),
  // useRouteMatch: () => ({ url: '/company/company-id1/team/team-id1' }),
}));

const item = {
  "id": "Marutiefty878781899",
  "name": "Maruti Brezza",
  "price": "₹ 7.99 Lakh onwards",
  "image": "brezza.webp",
  "description": [
    {
      "key": "Variants",
      "value": "The new Maruti Suzuki Brezza is available in four variants including LXi, VXi, ZXi, and ZXi (O)."
    },
    {
      "key": "Market introduction",
      "value": "The 2022 Maruti Brezza was launched in India on 30 June."
    },
    {
      "key": "Market introduction",
      "value": "The new Maruti Suzuki Brezza is powered by a 1.5-litre K12C petrol engine producing 103bhp and 138Nm of torque. This motor is paired with six-speed manual and automatic units."
    },
    {
      "key": "Exterior Design",
      "value": "On the outside, the 2022 Maruti Brezza features LED projector headlamps, twin L-shaped LED DRLs, a new grille with chrome inserts, fog lights, contrast-coloured skid plate, new front and rear bumpers, roof rails, new 16-inch dual-tone alloy wheels, blacked-out A, B, and C-pillars, wraparound LED tail lights, Brezza lettering on the boot lid, an integrated spoiler with a high-mounted stop lamp, and a shark-fin antenna."
    },
    {
      "key": "Interiors and features",
      "value": "The interiors of the new Maruti Brezza come equipped with an electric sunroof, paddle shifters, Head-Up Display (HUD), Suzuki Connect telematics, a new nine-inch freestanding touchscreen infotainment system, a new flat-bottom steering wheel, six airbags, and ESP."
    },
    {
      "key": "Colours",
      "value": "The Maruti Suzuki Brezza is available in six colours including Pearl Arctic White, Splendid Silver, Magma Grey, Sizzling Red, Brave Khakhi, and Exuberant Blue."
    },
    {
      "key": "Seating capacity",
      "value": "The 2022 Maruti Brezza has a seating capacity of five occupants."
    },
    {
      "key": "Rivals",
      "value": "The new Maruti Suzuki Brezza will rival the Hyundai Venue, Kia Sonet, Toyota Urban Cruiser, Tata Nexon, and the Mahindra XUV300."
    }
  ],
  "compareParams": {
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
  },
  "feedback": [
    {
      "key": "9793d18b-11e7-4691-b146-390ab788937f",
      "title": "Great",
      "subtitle": "Its a great car to buy.",
      "name": "Pushkar Shrivastava",
      "email": "shrivastava.pushkar92@gmail.com"
    }
  ]
}

describe('test car details page', () => {
  it('test car details page rendering', async () => {
    jest.spyOn(apis, 'addFeedback').mockImplementationOnce(() => Promise.resolve(item));
    jest.spyOn(apis, 'removeFeedback').mockImplementationOnce(() => Promise.resolve(item));
    jest
      .spyOn(apis, "getCarDetailsApi")
      .mockImplementationOnce(() => Promise.resolve(item));

    await act(async () => render(<Provider store={configureAppStore()}><CarDetailsPage /></Provider>, { wrapper: BrowserRouter }));
    const closeIcn = screen.getByTestId('CloseIcon');
    await act(async () => userEvent.click(closeIcn));
    const addFeedbackBtn = screen.getByRole('button', { name: 'Add Feedback' });
    await act(async () => userEvent.click(addFeedbackBtn));
    const addFeedback = screen.getByRole('button', { name: 'Add Feedback' });
    await act(async () => {
      userEvent.click(addFeedback)
      const name = screen.getByRole('textbox', { name: 'Name' });
      const email = screen.getByRole('textbox', { name: 'Email' });
      const feedbackTitle = screen.getByRole('textbox', { name: 'Feedback Title' });
      const Comment = screen.getByRole('textbox', { name: 'Feedback Comment' });
      expect(name).toBeInTheDocument();
      expect(email).toBeInTheDocument();
      expect(feedbackTitle).toBeInTheDocument();
      expect(Comment).toBeInTheDocument();
      await act(async () => {
        userEvent.type(name, 'test')
        await act(async () => {
          userEvent.type(email, 'test1')
          await act(async () => {
            userEvent.type(feedbackTitle, 'test2')
            await act(async () => userEvent.type(Comment, 'test4'));
          });
        });
      });
    });
  })
})