// app/dashboard/history/page.tsx
import { db } from '@/utils/db';
import { AIOutput } from '@/utils/schema';
import { currentUser } from '@clerk/nextjs/server'
import { desc, eq } from 'drizzle-orm';
import HistoryClient from './HistoryClient';

export interface HISTORY {
    id: Number,
    formData: string,
    aiResponse: string,
    templateSlug: string,
    createdBy: string,
    createdAt: string
}

async function HistoryPage() {
    const user = await currentUser();
    const HistoryList: HISTORY[] = await db.select().from(AIOutput)
        .where(eq(AIOutput.createdBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(AIOutput.id));

    return <HistoryClient historyList={HistoryList} />;
}

export default HistoryPage;