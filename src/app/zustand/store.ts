import { create } from 'zustand';
import { persist, PersistStorage } from 'zustand/middleware';


interface ComponentStore {
  selectedComponent: string;
  setSelectedComponent: (componentName: string) => void;
  resetComponent: () => void;
}

// const useComponentStore = create<ComponentStore>()(
//     persist(set) => ({
//   selectedComponent: 'StatusCheck', // 기본 컴포넌트
//   setSelectedComponent: (componentName: string) => set({ selectedComponent: componentName }),
//   resetComponent: () => set({ selectedComponent: 'StatusCheck' }),
// }));
// 래퍼를 사용하여 localStorage를 올바르게 설정
const zustandStorage: PersistStorage<ComponentStore> = {
    getItem: (name) => {
      const value = localStorage.getItem(name);
      return value ? JSON.parse(value) : null;
    },
    setItem: (name, value) => {
      localStorage.setItem(name, JSON.stringify(value));
    },
    removeItem: (name) => {
      localStorage.removeItem(name);
    },
  };
// zustand store 설정
const useComponentStore = create<ComponentStore>()(
    persist(
      (set) => ({
        selectedComponent: 'StatusCheck', // 기본 컴포넌트
  
        setSelectedComponent: (componentName: string) =>
          set({ selectedComponent: componentName }),
  
        resetComponent: () =>
          set({ selectedComponent: 'StatusCheck' }),
      }),
      {
        name: 'component-store', // 로컬 스토리지에 저장되는 키 이름
        storage: zustandStorage, // 저장소 설정 (기본적으로 localStorage 사용)
    }
    )
  );

export default useComponentStore;
