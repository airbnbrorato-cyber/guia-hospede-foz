import { db, auth, isFirebaseConfigured } from './firebase';
import { 
  collection, doc, getDocs, getDoc, setDoc, deleteDoc 
} from 'firebase/firestore';
import { initialSettings, initialSections, initialBookings, initialExpenses } from '../data/seedData';

const STORAGE_KEYS = {
  SETTINGS: 'airbnb_foz_settings_v4',
  CONTENT: 'airbnb_foz_content_v4',
  BOOKINGS: 'airbnb_foz_bookings_v3',
  EXPENSES: 'airbnb_foz_expenses_v3',
  AUTH: 'airbnb_foz_admin_auth'
};

function initLocalStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(initialSettings));
  }
  if (!localStorage.getItem(STORAGE_KEYS.CONTENT)) {
    localStorage.setItem(STORAGE_KEYS.CONTENT, JSON.stringify(initialSections));
  }
  if (!localStorage.getItem(STORAGE_KEYS.BOOKINGS)) {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(initialBookings));
  }
  if (!localStorage.getItem(STORAGE_KEYS.EXPENSES)) {
    localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(initialExpenses));
  }
}

initLocalStorage();

export const dataService = {
  async getSettings() {
    if (isFirebaseConfigured) {
      try {
        const docRef = doc(db, 'settings', 'general');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) return docSnap.data();
      } catch (err) {
        console.warn('Erro ao ler settings do Firestore:', err);
      }
    }
    const local = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return local ? JSON.parse(local) : initialSettings;
  },

  async updateSettings(newSettings) {
    if (isFirebaseConfigured && auth.currentUser) {
      try {
        const docRef = doc(db, 'settings', 'general');
        await setDoc(docRef, newSettings, { merge: true });
      } catch (err) {
        console.warn('Erro ao salvar settings no Firestore:', err);
      }
    }
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(newSettings));
    return newSettings;
  },

  async getSections() {
    if (isFirebaseConfigured) {
      try {
        const colRef = collection(db, 'content');
        const snap = await getDocs(colRef);
        if (!snap.empty) {
          return snap.docs.map(d => ({ id: d.id, ...d.data() }));
        }
      } catch (err) {
        console.warn('Erro ao ler content do Firestore:', err);
      }
    }
    const local = localStorage.getItem(STORAGE_KEYS.CONTENT);
    return local ? JSON.parse(local) : initialSections;
  },

  async getSectionById(id) {
    const sections = await this.getSections();
    return sections.find(s => s.id === id) || null;
  },

  async updateSection(id, updatedData) {
    if (isFirebaseConfigured && auth.currentUser) {
      try {
        const docRef = doc(db, 'content', id);
        await setDoc(docRef, updatedData, { merge: true });
      } catch (err) {
        console.warn('Erro ao atualizar seção no Firestore:', err);
      }
    }
    const sections = await this.getSections();
    const index = sections.findIndex(s => s.id === id);
    if (index !== -1) {
      sections[index] = { ...sections[index], ...updatedData };
    } else {
      sections.push({ id, ...updatedData });
    }
    localStorage.setItem(STORAGE_KEYS.CONTENT, JSON.stringify(sections));
    return updatedData;
  },

  async getBookings() {
    if (isFirebaseConfigured && auth.currentUser) {
      try {
        const snap = await getDocs(collection(db, 'bookings'));
        return snap.docs.map(d => ({ id: d.id, ...d.data() }));
      } catch (err) {
        console.warn('Erro ao ler bookings do Firestore:', err);
      }
    }
    const local = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    return local ? JSON.parse(local) : initialBookings;
  },

  async saveBooking(booking) {
    const isNew = !booking.id;
    const bookingId = booking.id || ('b-' + Date.now());
    const payload = { ...booking, id: bookingId };

    if (isFirebaseConfigured && auth.currentUser) {
      try {
        const docRef = doc(db, 'bookings', bookingId);
        await setDoc(docRef, payload, { merge: true });
      } catch (err) {
        console.warn('Erro ao salvar reserva no Firestore:', err);
      }
    }

    const bookings = await this.getBookings();
    if (isNew) {
      bookings.push(payload);
    } else {
      const idx = bookings.findIndex(b => b.id === bookingId);
      if (idx !== -1) bookings[idx] = payload;
      else bookings.push(payload);
    }
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
    return payload;
  },

  async deleteBooking(bookingId) {
    if (isFirebaseConfigured && auth.currentUser) {
      try {
        await deleteDoc(doc(db, 'bookings', bookingId));
      } catch (err) {
        console.warn('Erro ao deletar reserva no Firestore:', err);
      }
    }
    const bookings = await this.getBookings();
    const filtered = bookings.filter(b => b.id !== bookingId);
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(filtered));
    return true;
  },

  async getExpenses() {
    if (isFirebaseConfigured && auth.currentUser) {
      try {
        const snap = await getDocs(collection(db, 'expenses'));
        return snap.docs.map(d => ({ id: d.id, ...d.data() }));
      } catch (err) {
        console.warn('Erro ao ler despesas do Firestore:', err);
      }
    }
    const local = localStorage.getItem(STORAGE_KEYS.EXPENSES);
    return local ? JSON.parse(local) : initialExpenses;
  },

  async saveExpense(expense) {
    const isNew = !expense.id;
    const expenseId = expense.id || ('exp-' + Date.now());
    const payload = { ...expense, id: expenseId };

    if (isFirebaseConfigured && auth.currentUser) {
      try {
        const docRef = doc(db, 'expenses', expenseId);
        await setDoc(docRef, payload, { merge: true });
      } catch (err) {
        console.warn('Erro ao salvar despesa no Firestore:', err);
      }
    }

    const expenses = await this.getExpenses();
    if (isNew) {
      expenses.push(payload);
    } else {
      const idx = expenses.findIndex(e => e.id === expenseId);
      if (idx !== -1) expenses[idx] = payload;
      else expenses.push(payload);
    }
    localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
    return payload;
  },

  async deleteExpense(expenseId) {
    if (isFirebaseConfigured && auth.currentUser) {
      try {
        await deleteDoc(doc(db, 'expenses', expenseId));
      } catch (err) {
        console.warn('Erro ao deletar despesa no Firestore:', err);
      }
    }
    const expenses = await this.getExpenses();
    const filtered = expenses.filter(e => e.id !== expenseId);
    localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(filtered));
    return true;
  },

  getAuthStatus() {
    return localStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
  },

  setAuthStatus(isLoggedIn) {
    localStorage.setItem(STORAGE_KEYS.AUTH, isLoggedIn ? 'true' : 'false');
  }
};
