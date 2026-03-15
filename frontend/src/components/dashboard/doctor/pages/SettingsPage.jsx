import { useState, useEffect } from "react";
import Card from "../../ui/Card";
import Button from "../../ui/Button";
import Badge from "../../ui/Badge";

const SettingsPage = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    // TODO: Fetch doctor settings from backend
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Settings */}
      <Card>
        <Card.Header>
          <Card.Title>Profile Information</Card.Title>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsEditMode(!isEditMode)}
          >
            {isEditMode ? "Cancel" : "Edit"}
          </Button>
        </Card.Header>
        <Card.Content className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1">
              Full Name
            </label>
            <input
              type="text"
              disabled={!isEditMode}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Dr. Name"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1">
              Specialization
            </label>
            <input
              type="text"
              disabled={!isEditMode}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Specialization"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1">
              Experience (years)
            </label>
            <input
              type="number"
              disabled={!isEditMode}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Years"
            />
          </div>
          {isEditMode && (
            <div className="flex gap-2 pt-4 border-t border-gray-200">
              <Button size="sm" className="flex-1">
                Save Changes
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex-1"
                onClick={() => setIsEditMode(false)}
              >
                Cancel
              </Button>
            </div>
          )}
        </Card.Content>
      </Card>

      {/* Clinic Information */}
      <Card>
        <Card.Header>
          <Card.Title>Clinic & Availability</Card.Title>
        </Card.Header>
        <Card.Content className="space-y-4">
          <div className="text-center py-8 text-gray-500">
            <p className="text-lg mb-2">No clinic information added</p>
            <p className="text-sm">
              Configure your clinic details and availability settings here
            </p>
          </div>
        </Card.Content>
      </Card>

      {/* Account Settings */}
      <Card>
        <Card.Header>
          <Card.Title>Account Settings</Card.Title>
        </Card.Header>
        <Card.Content className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1">
              Email Address
            </label>
            <input
              type="email"
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="+1 (555) 000-0000"
            />
          </div>
        </Card.Content>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200 bg-red-50">
        <Card.Header>
          <Card.Title>Danger Zone</Card.Title>
        </Card.Header>
        <Card.Content className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900">Change Password</p>
              <p className="text-xs text-gray-600 mt-1">
                Update your account password
              </p>
            </div>
            <Button size="sm" variant="outline">
              Change
            </Button>
          </div>
          <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900">Delete Account</p>
              <p className="text-xs text-gray-600 mt-1">
                Permanently delete your account
              </p>
            </div>
            <Button size="sm" variant="danger">
              Delete
            </Button>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default SettingsPage;
