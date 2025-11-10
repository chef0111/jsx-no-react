/* @jsx createElement */
import { createElement, useState } from '../../jsx-runtime';
import { Card, Modal, Form, Input, Button } from './index';

const ComponentLibraryDemo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submittedData, setSubmittedData] = useState<any>(null);
  const [cardClickCount, setCardClickCount] = useState(0);

  const handleFormSubmit = (e: Event) => {
    e.preventDefault();
    setSubmittedData({ ...formData });
    setFormData({ name: '', email: '', message: '' });
  };

  const handleInputChange = (field: string) => (e: Event) => {
    const value = (e.target as HTMLInputElement).value;
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Exercise 3.2: Component Library
        </h1>
        <p className="text-muted-foreground mb-8">
          Reusable components built with shadcn-style design system
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card title="Card Component">
            <p className="mb-4 text-sm text-muted-foreground">
              This is a reusable Card component with title, children, and className props.
            </p>
            <div className="text-sm space-y-1">
              <p>✓ TypeScript interfaces</p>
              <p>✓ Styled with shadcn design tokens</p>
              <p>✓ Composable and reusable</p>
            </div>
          </Card>

          <Card 
            title="Interactive Card" 
            onClick={() => setCardClickCount(cardClickCount + 1)}
            className="cursor-pointer"
          >
            <p className="mb-4 text-sm text-muted-foreground">Click this card to test the onClick handler!</p>
            <div className="mt-4 p-3 bg-primary/10 rounded-lg text-center font-semibold text-primary">
              Clicked {cardClickCount} times
            </div>
          </Card>

          <Card title="Card with Custom Content">
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎨</span>
                <span>Custom styled content</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">📦</span>
                <span>Flexible children support</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔧</span>
                <span>Easy to customize</span>
              </div>
            </div>
          </Card>

          <Card title="Modal & Button Demo">
            <p className="mb-4 text-sm text-muted-foreground">
              Click the button below to open a modal dialog.
            </p>
            <Button
              onClick={() => setIsModalOpen(true)}
              variant="default"
              className="w-full"
            >
              Open Modal
            </Button>
          </Card>
        </div>

        <Card title="Form & Input Components" className="mb-8">
          <Form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Name
              </label>
              <Input
                type="text"
                value={formData.name}
                onInput={handleInputChange('name')}
                placeholder="Enter your name"
                required={true}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Email
              </label>
              <Input
                type="email"
                value={formData.email}
                onInput={handleInputChange('email')}
                placeholder="Enter your email"
                required={true}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Message
              </label>
              <Input
                type="text"
                value={formData.message}
                onInput={handleInputChange('message')}
                placeholder="Enter a message"
              />
            </div>

            <Button
              type="submit"
              variant="default"
              className="w-full"
            >
              Submit Form
            </Button>
          </Form>

          {submittedData ? (
            <div className="mt-6 p-4 bg-accent/50 border-l-4 border-primary rounded">
              <h4 className="font-semibold mb-2">Form Submitted!</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <p><strong>Name:</strong> {submittedData.name}</p>
                <p><strong>Email:</strong> {submittedData.email}</p>
                <p><strong>Message:</strong> {submittedData.message || '(empty)'}</p>
              </div>
            </div>
          ) : null}
        </Card>

        <Card title="Component Library Features">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-primary/10 rounded-lg">
              <h4 className="font-semibold mb-2">✓ TypeScript Interfaces</h4>
              <p className="text-sm text-muted-foreground">
                All components have proper TypeScript interfaces for type safety
              </p>
            </div>
            <div className="p-4 bg-accent rounded-lg">
              <h4 className="font-semibold mb-2">✓ Common Props Support</h4>
              <p className="text-sm text-muted-foreground">
                Handles className, children, onClick, and other common props
              </p>
            </div>
            <div className="p-4 bg-secondary/20 rounded-lg">
              <h4 className="font-semibold mb-2">✓ Event Handling</h4>
              <p className="text-sm text-muted-foreground">
                Proper event handling with preventDefault for forms
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">✓ Reusable & Composable</h4>
              <p className="text-sm text-muted-foreground">
                Components can be easily reused and composed together
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Modal Component Demo"
      >
        <div className="space-y-4">
          <p className="text-muted-foreground">
            This is a modal dialog component with the following features:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Opens and closes based on isOpen prop</li>
            <li>Click outside to close (overlay click detection)</li>
            <li>Close button in header</li>
            <li>Proper z-index layering</li>
            <li>Scrollable content for long modals</li>
          </ul>
          <div className="flex gap-2 mt-6">
            <Button
              onClick={() => setIsModalOpen(false)}
              variant="outline"
              className="flex-1"
            >
              Close Modal
            </Button>
            <Button
              onClick={() => {
                setIsModalOpen(false);
                setSubmittedData({ name: 'Action', email: 'executed@demo.com', message: 'Button clicked!' });
              }}
              variant="default"
              className="flex-1"
            >
              Execute Action
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ComponentLibraryDemo;
