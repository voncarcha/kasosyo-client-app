import { useState, useEffect } from 'react';
import { UserCircle, Envelope, Phone, IdentificationBadge } from '@phosphor-icons/react';
import { useAuthStore } from '@/features/auth/store/auth-store';
import { ProfileOverview } from './ProfileOverview';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/toast';
import { PhoneChangeModal } from './PhoneChangeModal';

export function ProfilePage() {
  const { user, updateUser } = useAuthStore();
  const { addToast } = useToast();
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
      });
    }
  }, [user]);

  const handleSave = async () => {
    if (!user) return;

    const trimmedFirst = formData.firstName.trim();
    const trimmedLast = formData.lastName.trim();

    if (!trimmedFirst || !trimmedLast) {
      addToast('error', 'First and last name are required');
      return;
    }

    setIsSaving(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      updateUser({
        firstName: trimmedFirst,
        lastName: trimmedLast,
      });

      addToast('success', 'Profile updated successfully');
    } catch {
      addToast('error', 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePhoneChange = (newPhone: string) => {
    updateUser({ phone: newPhone });
    setIsPhoneModalOpen(false);
    addToast('success', 'Phone number updated');
  };

  const hasChanges = user && (
    user.firstName !== formData.firstName ||
    user.lastName !== formData.lastName
  );

  if (!user) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-32 w-32 bg-muted rounded-full mx-auto" />
          <div className="h-4 w-48 bg-muted rounded mx-auto" />
          <div className="h-3 w-32 bg-muted rounded mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-2xl">
      <ProfileOverview user={user} />

      <div className="border border-border rounded-lg p-6 bg-card">
        <h2 className="text-lg font-semibold text-foreground mb-4">My Details</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">First Name</label>
            <Input
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              leftIcon={<UserCircle className="h-4 w-4" />}
              disabled={isSaving}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Last Name</label>
            <Input
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              leftIcon={<UserCircle className="h-4 w-4" />}
              disabled={isSaving}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">User ID</label>
            <Input
              value={user.id}
              leftIcon={<IdentificationBadge className="h-4 w-4" />}
              disabled
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Email</label>
            <Input
              value={user.email}
              leftIcon={<Envelope className="h-4 w-4" />}
              disabled
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Phone Number</label>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <Input
                  value={user.phone || 'Not set'}
                  leftIcon={<Phone className="h-4 w-4" />}
                  disabled
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setIsPhoneModalOpen(true)}
                disabled={isSaving}
              >
                Change
              </Button>
            </div>
          </div>

          <div className="pt-4">
            <Button
              onClick={handleSave}
              isLoading={isSaving}
              disabled={!hasChanges}
              className="w-full"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      <PhoneChangeModal
        isOpen={isPhoneModalOpen}
        onClose={() => setIsPhoneModalOpen(false)}
        onConfirm={handlePhoneChange}
        currentPhone={user.phone}
      />
    </div>
  );
}
