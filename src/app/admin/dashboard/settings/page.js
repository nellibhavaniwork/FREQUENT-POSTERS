import { dbFindOne } from '../../../../lib/dbService.js';
import { getAdminSession } from '../../../../lib/auth.js';
import SettingsCMSClient from './SettingsCMSClient.js';

export const revalidate = 0;

export default async function SettingsAdminPage() {
  const [settings, session] = await Promise.all([
    dbFindOne('settings'),
    getAdminSession(),
  ]);

  return (
    <SettingsCMSClient
      initialSettings={settings || {}}
      adminEmail={session?.email || 'frequentposters@redadmin.in'}
    />
  );
}

