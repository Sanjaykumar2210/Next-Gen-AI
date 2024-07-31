import { db } from '@/utils/db';
import { AIOutput } from '@/utils/schema';
import { currentUser } from '@clerk/nextjs/server'
import { desc, eq, sql } from 'drizzle-orm';
import HistoryClient from './HistoryClient';

export interface HISTORY {
    id: Number,
    formData: string,
    aiResponse: string | null,
    templateSlug: string,
    createdBy: string,
    createdAt: string | null
}

async function HistoryPage() {
    const user = await currentUser();
    const userEmail = user?.primaryEmailAddress?.emailAddress;

    if (!userEmail) {
        // Handle the case where the user email is not available
        return <div>User email not found</div>;
    }

    const HistoryList: HISTORY[] = await db.select().from(AIOutput)
        .where(eq(AIOutput.createdBy, userEmail))
        .orderBy(desc(AIOutput.id));

    return <HistoryClient historyList={HistoryList} />;
}

export default HistoryPage;