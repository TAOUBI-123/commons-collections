/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package benchmarks.collections;

import org.apache.commons.collections4.Bag;
import org.apache.commons.collections4.bag.HashBag;
import org.apache.commons.collections4.bag.TreeBag;
import org.apache.commons.collections4.bag.SynchronizedBag;
import org.openjdk.jmh.annotations.*;

import java.util.concurrent.TimeUnit;

@BenchmarkMode(Mode.Throughput) // Mesure du nombre d'opérations par seconde
@OutputTimeUnit(TimeUnit.MILLISECONDS) // Résultats en millisecondes
@State(Scope.Thread) // Une instance par thread
public class BagBenchmark {

    private Bag<Integer> hashBag;
    private Bag<Integer> treeBag;
    private Bag<Integer> synchronizedBag;

    @Setup(Level.Iteration)
    public void setup() {
        // Initialisation des différentes implémentations de Bag
        hashBag = new HashBag<>();
        treeBag = new TreeBag<>();
        synchronizedBag = SynchronizedBag.synchronizedBag(new HashBag<>());

        // Pré-remplissage des Bags avec 1000 éléments
        for (int i = 0; i < 1000; i++) {
            hashBag.add(i);
            treeBag.add(i);
            synchronizedBag.add(i);
        }
    }

    @Benchmark
    public void testHashBagAdd() {
        hashBag.add(1234);
    }

    @Benchmark 
    public void testTreeBagAdd() {
        treeBag.add(1234);
    }

    @Benchmark
    public void testSynchronizedBagAdd() {
        synchronizedBag.add(1234);
    }

    @Benchmark
    public void testHashBagRemove() {
        hashBag.remove(500);
    }

    @Benchmark
    public void testTreeBagRemove() {
        treeBag.remove(500);
    }

    @Benchmark
    public void testSynchronizedBagRemove() {
        synchronizedBag.remove(500);
    }

    @Benchmark
    public int testHashBagGetCount() {
        return hashBag.getCount(500);
    }

    @Benchmark
    public int testTreeBagGetCount() {
        return treeBag.getCount(500);
    }

    @Benchmark
    public int testSynchronizedBagGetCount() {
        return synchronizedBag.getCount(500);
    }
}
