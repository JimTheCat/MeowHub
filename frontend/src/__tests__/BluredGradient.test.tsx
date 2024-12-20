import '@testing-library/jest-dom';
import {BluredGradient} from "../Features/shared/components/BluredGradient";
import {render} from "./test-utils/render";

describe('BluredGradient Component', () => {
  it('renders with default props', () => {
    const {container} = render(<BluredGradient/>);

    const box = container.firstChild; // Get the Box component
    expect(box).toBeInTheDocument();
    expect(box).toHaveStyle('background-image: linear-gradient(45deg, hotpink, cyan)');
  });

  it('renders with custom props', () => {
    const {container} = render(
      <BluredGradient fromColor="red" toColor="blue" deg={90} blur={300}/>
    );

    const box = container.firstChild; // Get the Box component
    expect(box).toBeInTheDocument();
    expect(box).toHaveStyle('background-image: linear-gradient(90deg, red, blue)');
  });
});
