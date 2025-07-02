import { forwardRef } from 'react';

const TestComponent = forwardRef<HTMLDivElement>((_props, ref) => {
  return (
    <div ref={ref}>
      <h1>Test Component</h1>
    </div>
  );
});

TestComponent.displayName = 'TestComponent';

export default TestComponent;
