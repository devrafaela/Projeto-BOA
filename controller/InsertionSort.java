import java.util.Arrays;

public class InsertionSort {

    // Algoritmo Insertion Sort
    public void insertSort(int[] valores) {
        for (int i = 1; i < valores.length; i++) {
            int chave = valores[i]; // Elemento atual a ser inserido na posição correta
            int j = i - 1;

            // Move elementos maiores que a "chave" para a direita
            while (j >= 0 && valores[j] > chave) {
                //System.out.println("Array no momento: " + Arrays.toString(valores));
                valores[j + 1] = valores[j];
                j--;
                
            }
            valores[j + 1] = chave; // Insere a chave na posição correta
            //System.out.println("Array no momento: " + Arrays.toString(valores));
        }
    }
}